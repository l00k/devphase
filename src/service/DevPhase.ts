import { ContractAbi, ContractType } from '@/def';
import { ContractFactory } from '@/service/ContractFactory';
import { EventQueue } from '@/utils/EventQueue';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import { TxHandler } from '@/utils/TxHandler';
import { waitFor, WaitForOptions } from '@/utils/waitFor';
import { types as PhalaSDKTypes } from '@phala/sdk';
import { khalaDev as KhalaTypes } from '@phala/typedefs';
import { ApiPromise, WsProvider } from '@polkadot/api';
import type { ApiOptions } from '@polkadot/api/types';
import * as Keyring from '@polkadot/keyring';
import type { KeyringPair } from '@polkadot/keyring/types';
import axios, { AxiosInstance } from 'axios';
import chalk from 'chalk';
import fs from 'fs';


export type Accounts = {
    alice? : KeyringPair,
    bob? : KeyringPair,
    charlie? : KeyringPair,
    dave? : KeyringPair,
    eve? : KeyringPair,
    ferdie? : KeyringPair,
    [name : string] : KeyringPair,
}
export type AccountKey = keyof Accounts | string;

export type WorkerInfo = {
    publicKey : string,
    ecdhPublicKey : string,
}

export type SetupOptions = {
    nodeUrl? : string,
    nodeApiOptions? : ApiOptions,
    workerUrl? : string,
    accountsMnemonic? : string,
    accountsPaths? : Record<string, string>,
    sudoAccount? : string,
    ss58Prefix? : number,
    clusterId? : string,
}

export type GetFactoryOptions = {
    clusterId? : string
}


export class DevPhase
{
    
    public readonly api : ApiPromise;
    public readonly workerUrl : string;
    public readonly workerApi : AxiosInstance;
    
    public readonly accounts : Accounts = {};
    public readonly sudoAccount : KeyringPair;
    
    public readonly mainClusterId : string;
    
    protected _logger : Logger = new Logger('devPhase');
    protected _apiProvider : WsProvider;
    protected _eventQueue : EventQueue = new EventQueue();
    protected _workerInfo : WorkerInfo;
    
    
    private constructor () {}
    
    public static async setup (options : SetupOptions = {}) : Promise<DevPhase>
    {
        options = {
            nodeUrl: 'ws://localhost:9944',
            nodeApiOptions: {
                types: {
                    ...KhalaTypes,
                    ...PhalaSDKTypes,
                }
            },
            workerUrl: 'http://localhost:8000',
            accountsMnemonic: '',
            accountsPaths: {
                alice: '//Alice',
                bob: '//Bob',
                charlie: '//Charlie',
                dave: '//Dave',
                eve: '//Eve',
                ferdie: '//Ferdie',
            },
            sudoAccount: 'alice',
            ss58Prefix: 30,
            clusterId: undefined,
            ...options,
        };
        
        const instance = new DevPhase();
        
        instance._apiProvider = new WsProvider(options.nodeUrl);
        
        const api = await ApiPromise.create({
            provider: instance._apiProvider,
            ...options.nodeApiOptions
        });
        
        await instance._eventQueue.init(api);
        
        // get accounts
        const keyring = new Keyring.Keyring();
        keyring.setSS58Format(options.ss58Prefix);
        
        for (const [ name, path ] of Object.entries(options.accountsPaths)) {
            instance.accounts[name] = keyring.createFromUri(
                options.accountsMnemonic + path,
                undefined,
                'sr25519'
            );
        }
        
        Object.assign(instance, {
            api,
            sudoAccount: instance.accounts[options.sudoAccount],
        });
        
        // check worker
        await instance._prepareWorker(options.workerUrl);
        
        // wait for gatekeeper
        await instance._waitForGatekeeper();
        
        // create cluster if needed
        if (options.clusterId === undefined) {
            const clustersNum : number = <any>(
                await api.query
                    .phalaFatContracts.clusterCounter()
            ).toJSON();
            
            if (clustersNum == 0) {
                options.clusterId = null;
            }
            else {
                options.clusterId = '0x0000000000000000000000000000000000000000000000000000000000000000';
            }
        }
        
        let mainClusterId = options.clusterId === null
            ? await instance._createCluster()
            : options.clusterId
        ;
        
        Object.assign(instance, { mainClusterId });
        
        // wait for cluster
        await instance._waitForClusterReady();
        
        return instance;
    }
    
    /**
     * Prepare DEV worker
     */
    protected async _prepareWorker (workerUrl : string)
    {
        Object.assign(this, {
            workerUrl,
            workerApi: axios.create({ baseURL: workerUrl })
        });
        
        this._workerInfo = await this._waitFor(
            async() => {
                const { status, data } = await this.workerApi.get('/get_info', { validateStatus: () => true });
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
            await this.api.query
                .phalaRegistry.workers(this._workerInfo.ecdhPublicKey)
        ).toJSON();
        
        if (!workerInfo) {
            // register worker
            const tx = this.api.tx.sudo.sudo(
                this.api.tx.phalaRegistry.forceRegisterWorker(
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
                        await this.api.query
                            .phalaRegistry.workers(this._workerInfo.ecdhPublicKey)
                    ).toJSON();
                },
                20 * 1000,
                { message: 'Worker registration' }
            );
        }
    }
    
    protected async _waitForGatekeeper ()
    {
        // check gatekeeper
        const gatekeepers : string[] = <any>(
            await this.api.query
                .phalaRegistry.gatekeeper()
        ).toJSON();
        
        if (!gatekeepers.includes(this._workerInfo.publicKey)) {
            // register gatekeeper
            const tx = this.api.tx.sudo.sudo(
                this.api.tx.phalaRegistry.registerGatekeeper(
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
                        await this.api.query
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
     * Creates new cluster
     */
    public async _createCluster () : Promise<string>
    {
        this._logger.log('Creating cluster');
        
        // create cluster
        const tx = this.api.tx.sudo.sudo(
            this.api.tx.phalaFatContracts.addCluster(
                this.accounts.alice.address,
                { Public: null },
                [ this._workerInfo.publicKey ]
            )
        );
        
        const result = await TxHandler.handle(
            tx,
            this.sudoAccount,
            'sudo(phalaFatContracts.addCluster)'
        );
        
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
    public async _waitForClusterReady () : Promise<boolean>
    {
        return this._waitFor(
            async() => {
                // cluster exists
                const cluster = await this.api.query
                    .phalaFatContracts.clusters(this.mainClusterId);
                if (cluster.isEmpty) {
                    return false;
                }
                
                // cluster key set
                const clusterKey = await this.api.query
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
    
    /**
     * Cleanup task
     */
    public async cleanup ()
    {
        await this._eventQueue.destroy();
        await this.api.disconnect();
    }
    
    
    public async getFactory<T> (
        type : ContractType,
        artifactPath : string,
        options : GetFactoryOptions = {}
    ) : Promise<ContractFactory<T>>
    {
        options = {
            clusterId: this.mainClusterId,
            ...options
        };
        
        if (!fs.existsSync(artifactPath)) {
            throw new Exception(
                'Contract artifact file not found',
                1665238985042
            );
        }
        
        const contractRaw : string = fs.readFileSync(
            artifactPath,
            { encoding: 'utf-8' }
        );
        
        try {
            const contractAbi : ContractAbi = JSON.parse(contractRaw);
            
            return ContractFactory.create(
                this,
                type,
                contractAbi,
                options.clusterId
            );
        }
        catch (e) {
            throw new Exception(
                'Failed to parse contract artifiact JSON',
                1665238941553
            );
        }
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
