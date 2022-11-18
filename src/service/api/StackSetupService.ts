import { Accounts, StackSetupOptions, StackSetupResult } from '@/def';
import { DevPhase } from '@/service/api/DevPhase';
import { EventQueue } from '@/service/api/EventQueue';
import { TxHandler } from '@/service/api/TxHandler';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import { waitFor, WaitForOptions } from '@/utils/waitFor';
import { khalaDev as KhalaTypes } from '@phala/typedefs';
import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import axios from 'axios';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


type WorkerInfo = {
    publicKey : string,
    ecdhPublicKey : string,
}

export class StackSetupService
{
    
    protected static readonly MAP_STACK_TO_SETUP : Record<string, string> = {};
    
    protected _logger : Logger = new Logger(StackSetupService.name);
    
    protected _context : RuntimeContext;
    protected _api : ApiPromise;
    
    public readonly accounts : Accounts = {};
    public readonly sudoAccount : KeyringPair;
    
    public readonly mainClusterId : string;
    
    protected _eventQueue : EventQueue = new EventQueue();
    protected _workerInfo : WorkerInfo;
    
    
    public constructor (
        protected _devPhase : DevPhase
    )
    {
        this._context = this._devPhase.runtimeContext;
    }
    
    
    public async setupStack (options : StackSetupOptions) : Promise<StackSetupResult>
    {
        this._api = await this._devPhase.createApiPromise();
        
        const setupStackVersion = StackSetupService.MAP_STACK_TO_SETUP[this._context.config.stack.version] ?? 'default';
        const setupStackMethod = 'setupStack_' + setupStackVersion;
        
        if (!this[setupStackMethod]) {
            throw new Exception(
                'Undefined setup environment procedure for this stack version',
                1668661427343
            );
        }
        
        return this[setupStackMethod]();
    }
    
    /**
     * Default stack setup procedure
     */
    protected async setupStack_default (options : StackSetupOptions) : Promise<StackSetupResult>
    {
        // check worker
        await this.prepareWorker(options.workerUrl);
        
        // wait for gatekeeper
        await this.prepareGatekeeper();
        
        // create cluster if needed
        if (options.clusterId === undefined) {
            const clustersNum : number = <any>(
                await this._api.query
                    .phalaFatContracts.clusterCounter()
            ).toJSON();
            
            if (clustersNum == 0) {
                options.clusterId = null;
            }
            else {
                options.clusterId = '0x0000000000000000000000000000000000000000000000000000000000000000';
            }
        }
        
        const clusterId = options.clusterId === null
            ? await this.createCluster()
            : options.clusterId
        ;
        
        // wait for cluster
        await this.waitForClusterReady();
        
        return {
            clusterId
        };
    }
    
    
    /**
     * Prepare DEV worker
     */
    public async prepareWorker (workerUrl : string)
    {
        const workerApi = axios.create({ baseURL: workerUrl });
        
        this._workerInfo = await this._waitFor(
            async() => {
                const { status, data } = await workerApi.get('/get_info', { validateStatus: () => true });
                if (status === 200) {
                    const payload : any = JSON.parse(data.payload);
                    if (!payload.initialized) {
                        return false;
                    }
                    
                    return {
                        publicKey: '0x' + payload.public_key,
                        ecdhPublicKey: '0x' + payload.ecdh_public_key,
                    };
                }
                
                throw new Exception(
                    'Unable to get worker info',
                    1663941402827
                );
            },
            20 * 1000,
            { message: 'pRuntime initialization' }
        );
        
        const workerInfo : typeof KhalaTypes.WorkerInfo = <any>(
            await this._api.query
                .phalaRegistry.workers(this._workerInfo.ecdhPublicKey)
        ).toJSON();
        
        if (!workerInfo) {
            // register worker
            const tx = this._api.tx.sudo.sudo(
                this._api.tx.phalaRegistry.forceRegisterWorker(
                    this._workerInfo.publicKey,
                    this._workerInfo.ecdhPublicKey,
                    null
                )
            );
            
            const result = await TxHandler.handle(
                tx,
                this.sudoAccount,
                'sudo(phalaRegistry.forceRegisterWorker)'
            );
            
            await this._waitFor(
                async() => {
                    return (
                        await this._api.query
                            .phalaRegistry.workers(this._workerInfo.ecdhPublicKey)
                    ).toJSON();
                },
                20 * 1000,
                { message: 'Worker registration' }
            );
        }
    }
    
    public async prepareGatekeeper ()
    {
        // check gatekeeper
        const gatekeepers : string[] = <any>(
            await this._api.query
                .phalaRegistry.gatekeeper()
        ).toJSON();
        
        if (!gatekeepers.includes(this._workerInfo.publicKey)) {
            // register gatekeeper
            const tx = this._api.tx.sudo.sudo(
                this._api.tx.phalaRegistry.registerGatekeeper(
                    this._workerInfo.publicKey
                )
            );
            
            const result = await TxHandler.handle(
                tx,
                this.sudoAccount,
                'sudo(phalaRegistry.registerGatekeeper)'
            );
        }
        
        // wait for gate keeper master key
        try {
            await this._waitFor(
                async() => {
                    return !(
                        await this._api.query
                            .phalaRegistry.gatekeeperMasterPubkey()
                    ).isEmpty;
                },
                20 * 1000,
                { message: 'GK master key generation' }
            );
        }
        catch (e) {
            throw new Exception(
                'Could not fetch GK master key',
                1663941402827
            );
        }
    }
    
    /**
     * Prepare Phat Contract system
     */
    public async preparePhatContractsSystem () : Promise<void>
    {
        if (!this._context) {
            throw new Exception(
                'Non available out of runtime context environment',
                1668658002543
            );
        }
        
        const systemContractPath = path.join(
            this._context.paths.currentStack,
            'system.contract'
        );
        if (!fs.existsSync(systemContractPath)) {
        
        }
    }
    
    /**
     * Creates new cluster
     */
    public async createCluster () : Promise<string>
    {
        this._logger.log('Creating cluster');
        
        // create cluster
        const tx = this._api.tx.sudo.sudo(
            this._api.tx.phalaFatContracts.addCluster(
                this.accounts.alice.address,            // owner
                { Public: null },                       // access rights
                [ this._workerInfo.publicKey ],         // workers keys
                1e12,                                   // deposit
                1,                                      // gas price
                1,                                      // gas per item
                1,                                      // gas per byte
                this.accounts.alice.address             // treasury account
            )
        );
        
        const result = await TxHandler.handle(
            tx,
            this.sudoAccount,
            'sudo(phalaFatContracts.addCluster)'
        );
        
        await this._waitFor(async() => {
            const clusters = await this._api.query.phalaFatContracts.clusters.entries();
            console.dir(clusters, { depth: 10 });
        }, 5000);
        
        console.dir(result.toHuman(true), { depth: 10 });
        
        const clusterCreatedEvent = result.events.find(({ event }) => {
            return event.section === 'phalaFatContracts'
                && event.method === 'ClusterCreated';
        });
        if (!clusterCreatedEvent) {
            throw new Exception(
                'Error while creating cluster',
                1663941940784
            );
        }
        
        const clusterId = clusterCreatedEvent.event.data[0].toString();
        
        this._logger.log(chalk.green('Cluster created'));
        this._logger.log(clusterId);
        
        return clusterId;
    }
    
    /**
     * Wait for cluster to be ready
     */
    public async waitForClusterReady () : Promise<boolean>
    {
        return this._waitFor(
            async() => {
                // cluster exists
                const cluster = await this._api.query
                    .phalaFatContracts.clusters(this.mainClusterId);
                if (cluster.isEmpty) {
                    return false;
                }
                
                // cluster key set
                const clusterKey = await this._api.query
                    .phalaRegistry.clusterKeys(this.mainClusterId);
                if (clusterKey.isEmpty) {
                    return false;
                }
                
                return true;
            },
            20 * 1000,
            { message: 'Cluster ready' }
        );
    }
    
    protected async _waitFor (
        callback : () => Promise<any>,
        timeLimit : number,
        options : WaitForOptions = {}
    )
    {
        const firstTry = await callback();
        if (firstTry) {
            return firstTry;
        }
        
        if (options.message) {
            this._logger.debug('Waiting for', chalk.cyan(options.message));
        }
        
        const result = waitFor(
            callback,
            timeLimit,
            options
        );
        
        this._logger.debug(chalk.green('Ready'));
        
        return result;
    }
    
}
