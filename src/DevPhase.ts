import { EventQueue } from './EventQueue';
import { TxHandler } from '@/TxHandler';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import { waitFor, WaitForOptions } from '@/utils/waitFor';
import * as PhalaSdk from '@phala/sdk';
import type { khalaDev as KhalaTypes } from '@phala/typedefs';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise, Abi } from '@polkadot/api-contract';
import type { ApiOptions } from '@polkadot/api/types';
import * as Keyring from '@polkadot/keyring';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { IEvent } from '@polkadot/types/types';
import axios, { AxiosInstance } from 'axios';
import colors from 'colors';

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

export type ContractAbi = {
    source : {
        hash : string,
        language : string,
        compiler : string,
        wasm : string,
    },
    contract : {
        name : string,
        version : string,
        authors : string[],
    },
    [other : string] : any,
}

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

export enum ContractType
{
    InkCode = 'InkCode',
    SidevmCode = 'SidevmCode',
}

export type DeployOptions = {
    clusterId? : string,
    asAccount? : AccountKey,
}

export type InstantiateOptions = {
    salt? : number,
    asAccount? : AccountKey,
}

export type AttachOptions = {}


export class DevPhase
{
    
    public api : ApiPromise;
    public workerUrl : string;
    public workerApi : AxiosInstance;
    
    public accounts : Accounts = {};
    public sudoAccount : KeyringPair;
    
    public mainClusterId : string;
    
    protected _logger : Logger = new Logger('pDeployer', false);
    protected _apiProvider : WsProvider;
    protected _eventQueue : EventQueue = new EventQueue();
    protected _workerInfo : WorkerInfo;
    
    
    public async setup (options : SetupOptions)
    {
        options = {
            nodeUrl: 'ws://localhost:9944',
            nodeApiOptions: {},
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
        
        this._apiProvider = new WsProvider(options.nodeUrl);
        this.api = await ApiPromise.create({
            provider: this._apiProvider,
            ...options.nodeApiOptions
        });
        await this._eventQueue.init(this.api);
        
        // get accounts
        const keyring = new Keyring.Keyring();
        keyring.setSS58Format(options.ss58Prefix);
        
        for (const [ name, path ] of Object.entries(options.accountsPaths)) {
            this.accounts[name] = keyring.createFromUri(
                options.accountsMnemonic + path,
                undefined,
                'sr25519'
            );
        }
        
        this.sudoAccount = this.accounts[options.sudoAccount];
        
        // check worker
        await this._prepareWorker(options.workerUrl);
        
        // wait for gatekeeper
        await this._waitForGatekeeper();
        
        // create cluster if needed
        if (options.clusterId === undefined) {
            const clustersNum : number = <any>(
                await this.api.query
                    .phalaFatContracts.clusterCounter()
            ).toJSON();
            
            if (clustersNum == 0) {
                options.clusterId = null;
            }
            else {
                options.clusterId = '0x0000000000000000000000000000000000000000000000000000000000000000';
            }
        }
        
        if (options.clusterId === null) {
            this.mainClusterId = await this._createCluster();
        }
        else {
            this.mainClusterId = options.clusterId;
        }
        
        // wait for cluster
        await this._waitForClusterReady();
    }
    
    /**
     * Prepare DEV worker
     */
    protected async _prepareWorker (workerUrl : string)
    {
        this.workerUrl = workerUrl;
        this.workerApi = axios.create({ baseURL: workerUrl });
        
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
        
        this._logger.log(colors.green('Cluster created'));
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
    
    
    /**
     * Deploying contract to network
     */
    public async deploy (
        contractAbi : ContractAbi,
        type : ContractType,
        options : DeployOptions = {}
    ) : Promise<void>
    {
        options = {
            clusterId: this.mainClusterId,
            asAccount: 'alice',
        };
        
        const result = await TxHandler.handle(
            this.api.tx.phalaFatContracts.clusterUploadResource(
                options.clusterId,
                type,
                contractAbi.source.wasm
            ),
            this.accounts[options.asAccount],
            'phalaFatContracts.clusterUploadResource'
        );
    }
    
    
    /**
     * Creating contract instance
     */
    public async instantiate (
        contractAbi : ContractAbi,
        constructor : string,
        params : any[] = [],
        options : InstantiateOptions = {}
    ) : Promise<string>
    {
        options = {
            salt: 1000000000 + Math.round(Math.random() * 8999999999),
            asAccount: 'alice',
            ...options
        };
        
        const abi = new Abi(contractAbi);
        const callData = abi.findConstructor(constructor).toU8a(params);
        
        const result = await TxHandler.handle(
            this.api.tx.phalaFatContracts.instantiateContract(
                { WasmCode: contractAbi.source.hash },
                callData,
                '0x' + options.salt.toString(16),
                this.mainClusterId,
            ),
            this.accounts[options.asAccount],
            'phalaFatContracts.instantiateContract'
        );
        
        const instantiateEvent = result.events.find(({ event }) => {
            return event.section === 'phalaFatContracts'
                && event.method === 'Instantiating';
        });
        if (!instantiateEvent) {
            throw 'Error while instantiating contract';
        }
        
        const contractId = instantiateEvent.event.data[0].toString();
        this._logger.log('Contract ID: ', contractId);
        
        // wait for instantation
        let instantiated : boolean = false;
        let publicKey : string = null;
        
        this._eventQueue.registerHandler(
            'phalaFatContracts.Instantiated',
            { 0: contractId },
            async(event : IEvent<any>) => {
                instantiated = true;
            }
        );
        this._eventQueue.registerHandler(
            'phalaFatContracts.ContractPubkeyAvailable',
            { 0: contractId },
            async(event : IEvent<any>) => {
                const eventData = event.data.toJSON();
                publicKey = eventData[2];
            }
        );
        
        try {
            await this._waitFor(
                async() => {
                    return instantiated && !!publicKey;
                },
                20 * 1000,
                { message: 'Contract instantiation' }
            );
        }
        catch (e) {
            throw new Exception(
                'Could not get contract public key',
                1663952347291,
                e
            );
        }
        
        const clusterKey = (
            await this.api.query.phalaRegistry.clusterKeys(this.mainClusterId)
        ).toJSON();
        this._logger.log('Cluster Key: ', clusterKey);
        
        const contractKey = (
            await this.api.query.phalaRegistry.contractKeys(contractId)
        ).toJSON();
        this._logger.log('Contract Key:', contractKey);
        
        return contractId;
    }
    
    public async attach (
        contractId : string,
        contractAbi : ContractAbi,
        options : AttachOptions = {}
    ) : Promise<ContractPromise>
    {
        const workerApi = await PhalaSdk.create({
            api: this.api,
            baseURL: this.workerUrl,
            contractId
        });
        
        return new ContractPromise(
            workerApi,
            contractAbi,
            contractId,
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
            this._logger.debug('Waiting for', colors.cyan(options.message));
        }
        
        const result = waitFor(
            callback,
            timeLimit,
            options
        );
        
        this._logger.debug(colors.green('Ready'));
        
        return result;
    }
    
}
