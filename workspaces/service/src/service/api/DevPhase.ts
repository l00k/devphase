import type { Accounts, AccountsConfig, NetworkConfig } from '@/def';
import { ContractType, StackSetupMode, StackSetupOptions, SystemContract, SystemContractFileMap } from '@/def';
import { ContractFactory } from '@/service/api/ContractFactory';
import { EventQueue } from '@/service/api/EventQueue';
import { PinkLogger } from '@/service/api/PinkLogger';
import { PRuntimeApi } from '@/service/api/PRuntimeApi';
import { StackSetupService } from '@/service/api/StackSetupService';
import { AccountManager } from '@/service/project/AccountManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import type { ContractMetadata } from '@/typings';
import { Contract } from '@/typings';
import { Exception } from '@/utils/Exception';
import { replaceRecursive } from '@/utils/replaceRecursive';
import * as PhalaSdk from '@phala/sdk';
import { types as PhalaSDKTypes } from '@phala/sdk';
import { khalaDev as KhalaTypes } from '@phala/typedefs';
import { ApiPromise, WsProvider } from '@polkadot/api';
import type { ApiOptions } from '@polkadot/api/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import fs from 'fs';
import path from 'path';


type DevPhaseProps = {
    -readonly [K in keyof DevPhase]? : DevPhase[K]
}

type WorkerInfo = {
    initalized : boolean,
    publicKey : string,
    ecdhPublicKey : string,
}

export type GetFactoryOptions = {
    clusterId? : string,
    contractType? : ContractType,
    systemContract? : boolean,
}

export type GetPhatRegistryOptions = {
    autoConnect? : boolean,
    clusterId? : string,
    workerId? : string,
    pruntimeURL? : string,
    systemContractId? : string,
    skipCheck? : boolean,
}


export class DevPhase
{
    
    public readonly api : ApiPromise;
    public readonly network : string;
    public readonly networkConfig : NetworkConfig;
    public readonly blockTime : number;
    public readonly workerUrl : string;
    
    public readonly accounts : Accounts = {};
    public readonly suAccount : KeyringPair;
    public readonly suAccountCert : PhalaSdk.CertificateData;
    
    public readonly mainClusterId : string = '0x0000000000000000000000000000000000000000000000000000000000000000';
    
    public readonly runtimeContext : RuntimeContext;
    public readonly workerInfo : WorkerInfo;
    
    protected _apiProvider : WsProvider;
    protected _apiOptions : ApiOptions;
    protected _eventQueue : EventQueue = new EventQueue();
    protected _systemContracts : Record<string, Promise<Contract>> = {};
    
    // clusterId => driverName => Contract
    protected _driverContracts : Record<string, Record<string, Promise<Contract>>> = {};
    
    
    private constructor () {}
    
    
    public static async create (
        runtimeContext : RuntimeContext,
        options : Partial<DevPhase>
    ) : Promise<DevPhase>
    {
        // create instance
        const instance = new DevPhase();
        
        const networkConfig = runtimeContext.config.networks[options.network];
        if (!networkConfig) {
            throw new Exception(
                `Network <${options.network}> is not configured`,
                1673537590278
            );
        }
        
        instance._apiOptions = networkConfig.nodeApiOptions;
        instance._apiProvider = new WsProvider(networkConfig.nodeUrl);
        
        const api = await instance.createApiPromise();
        await instance._eventQueue.init(api);
        
        const blockTime = networkConfig.blockTime
            ?? runtimeContext.config.stack.blockTime
        ;
        
        const instanceProps : DevPhaseProps = {
            blockTime,
            networkConfig,
            runtimeContext,
            workerUrl: networkConfig.workerUrl,
            api,
            ...options,
        };
        if (networkConfig.defaultClusterId) {
            instanceProps.mainClusterId = networkConfig.defaultClusterId;
        }
        
        instanceProps.workerInfo = await DevPhase.getWorkerInfo(networkConfig.workerUrl);
        
        // assign props
        Object.assign(instance, instanceProps);
        
        // load accounts
        const accountManager = new AccountManager(runtimeContext);
        const accountsConfig : AccountsConfig = replaceRecursive({}, runtimeContext.config.accountsConfig);
        
        const accountsKeyrings = await accountManager.loadAccountsKeyringsFromStorageFile();
        if (accountsKeyrings) {
            replaceRecursive(accountsConfig, accountsKeyrings);
        }
        
        const accounts = await accountManager.loadAccounts(
            accountsConfig.keyrings,
            runtimeContext.config.general.ss58Format,
            true
        );
        
        const suAccount = accounts[accountsConfig.suAccount];
        if (!suAccount) {
            throw new Exception(
                'Undefined su account',
                1675762335735
            );
        }
        
        const suAccountCert = await PhalaSdk.signCertificate({ pair: suAccount });
        
        Object.assign(instance, {
            accounts,
            suAccount,
            suAccountCert,
        });
        
        return instance;
    }
    
    public async createApiPromise () : Promise<ApiPromise>
    {
        // @ts-ignore
        const options : ApiOptions = replaceRecursive({
            provider: this._apiProvider,
            noInitWarn: true,
            types: {
                ...KhalaTypes,
                ...PhalaSDKTypes,
            },
            signedExtensions: {
                CheckMqSequence: { // fix debug output
                    extrinsic: {},
                    payload: {},
                }
            }
        }, this._apiOptions);
        
        return ApiPromise.create(options);
    }
    
    public async stackSetup (options : Partial<StackSetupOptions> = {}) : Promise<void>
    {
        if (!this.runtimeContext) {
            throw new Exception(
                'Stack setup is not possible out of runtime context',
                1668741635272
            );
        }
        
        if (options.mode == StackSetupMode.None) {
            const mainClusterId = await this.getFirstClusterId();
            Object.assign(this, { mainClusterId });
            
            return;
        }
        
        const stackSetupService = new StackSetupService(this);
        
        const result = await stackSetupService.setupStack({
            ...this.runtimeContext.config.stack.setupOptions,
            ...options
        });
        
        Object.assign(this, {
            mainClusterId: result.clusterId
        });
    }
    
    /**
     * Cleanup task
     */
    public async cleanup ()
    {
        await this._eventQueue.destroy();
        await this.api.disconnect();
    }
    
    
    public async getFirstClusterId () : Promise<string>
    {
        const onChainClusterInfos : any = (
            await this.api.query
                .phalaPhatContracts.clusters
                .entries()
        )[0];
        
        return onChainClusterInfos[0].toHuman()[0];
    }
    
    public static async getWorkerInfo (workerUrl : string) : Promise<WorkerInfo>
    {
        const workerInfo : WorkerInfo = {
            initalized: false,
            publicKey: null,
            ecdhPublicKey: null,
        };
        
        const workerRpc = new PRuntimeApi(workerUrl);
        const response = await workerRpc.getInfo();
        
        workerInfo.initalized = response.initialized;
        if (!workerInfo.initalized) {
            return workerInfo;
        }
        
        workerInfo.publicKey = '0x' + response.publicKey;
        workerInfo.ecdhPublicKey = '0x' + response.ecdhPublicKey;
        
        return workerInfo;
    }
    
    public async getFactory<T extends Contract> (
        artifactPathOrName : string,
        options : GetFactoryOptions = {}
    ) : Promise<ContractFactory<T>>
    {
        options = {
            clusterId: this.mainClusterId,
            systemContract: false,
            ...options
        };
        
        // get artifact path
        const isContractName = /^[a-z0-9_]+$/i.test(artifactPathOrName);
        
        let artifactPath = artifactPathOrName;
        if (isContractName) {
            artifactPath = path.join(
                this.runtimeContext.paths.artifacts,
                artifactPathOrName,
                `${artifactPathOrName}.contract`
            );
        }
        
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
            const metadata : ContractMetadata.Metadata = JSON.parse(contractRaw);
            
            return ContractFactory.create(
                this,
                metadata,
                options
            );
        }
        catch (e) {
            throw new Exception(
                'Failed to parse contract artifiact JSON',
                1665238941553,
                e
            );
        }
    }
    
    public async getDriverContract (
        driverName : SystemContract,
        clusterId? : string,
    ) : Promise<Contract>
    {
        if (!clusterId) {
            clusterId = this.mainClusterId;
        }
        
        const systemContract = await this.getSystemContract(clusterId);
        
        if (!this._driverContracts[clusterId]) {
            this._driverContracts[clusterId] = {};
            
            if (!this._driverContracts[clusterId][driverName]) {
                this._driverContracts[clusterId][driverName] = new Promise(async(resolve, reject) => {
                    try {
                        const { output } = await systemContract.query['system::getDriver'](
                            this.suAccount.address,
                            { cert: this.suAccountCert },
                            driverName
                        );
                        
                        if (output?.isEmpty || !output.isOk) {
                            throw new Exception(
                                'Driver contract is not ready',
                                1675762897876
                            );
                        }
                        
                        const contractId = output.asOk.toHex();
                        
                        const driverContractPath = path.join(
                            this.runtimeContext.paths.currentStack,
                            SystemContractFileMap[driverName] + '.contract'
                        );
                        
                        const driverContractFactory = await this.getFactory(
                            driverContractPath,
                            {
                                clusterId,
                                contractType: ContractType.InkCode,
                            }
                        );
                        
                        const driverContract = await driverContractFactory.attach(contractId);
                        resolve(driverContract);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
        }
        
        return this._driverContracts[clusterId][driverName];
    }
    
    public async getSystemContract (
        clusterId? : string,
    ) : Promise<Contract>
    {
        if (!clusterId) {
            clusterId = this.mainClusterId;
        }
        
        if (!this._systemContracts[clusterId]) {
            this._systemContracts[clusterId] = new Promise(async(resolve, reject) => {
                try {
                    const onChainClusterInfo : any = await this.api.query
                        .phalaPhatContracts.clusters(clusterId);
                    const systemContractId = onChainClusterInfo.unwrap().systemContract.toHex();
                    if (!systemContractId) {
                        throw new Exception(
                            'Required system contract is not ready',
                            1675566610093
                        );
                    }
                    
                    const systemContractPath = path.join(
                        this.runtimeContext.paths.currentStack,
                        'system.contract'
                    );
                    
                    const systemContractFactory = await this.getFactory(
                        systemContractPath,
                        {
                            clusterId,
                            contractType: ContractType.InkCode,
                            systemContract: true,
                        }
                    );
                    
                    const systemContract = await systemContractFactory.attach(systemContractId);
                    resolve(systemContract);
                }
                catch (e) {
                    reject(e);
                }
            });
        }
        
        return this._systemContracts[clusterId];
    }
    
    public async getPhatRegistry (
        options : GetPhatRegistryOptions = {},
        forSystemContract : boolean = false,
    ) : Promise<PhalaSdk.OnChainRegistry>
    {
        const clusterId = options.clusterId ?? this.mainClusterId;
        
        const systemContract = forSystemContract
            ? undefined
            : await this.getSystemContract(clusterId)
        ;
        
        options = {
            clusterId,
            pruntimeURL: this.workerUrl,
            workerId: this.workerInfo.publicKey,
            systemContractId: systemContract?.contractId,
            
            autoConnect: false,
            skipCheck: false,
            
            ...options,
        };
        
        const phatRegistry = await PhalaSdk.OnChainRegistry.create(this.api, options);
        
        // pick worker
        const clusterWorkers = await phatRegistry.getClusterWorkers(clusterId);
        
        if (!options.workerId) {
            const clusterWorkersIds = clusterWorkers.map(worker => worker.pubkey);
            const random = Math.floor(Math.random() * clusterWorkersIds.length);
            options.workerId = clusterWorkersIds[random % clusterWorkersIds.length];
        }
        
        const targetWorker = clusterWorkers.find(worker => worker.pubkey == options.workerId);
        await phatRegistry.connect(targetWorker);
        
        return phatRegistry;
    }
    
    public async getPinkLogger (
        clusterId? : string
    ) : Promise<PinkLogger>
    {
        clusterId = clusterId ?? this.mainClusterId;
        return PinkLogger.create(this, clusterId);
    }
    
}
