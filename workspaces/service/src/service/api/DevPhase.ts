import type { Accounts, AccountsConfig, NetworkConfig } from '@/def';
import { ContractType, SystemContract, SystemContractFileMap } from '@/def';
import { ContractFactory } from '@/service/api/ContractFactory';
import { EventQueue } from '@/service/api/EventQueue';
import { StackSetupService } from '@/service/api/StackSetupService';
import { AccountManager } from '@/service/project/AccountManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import type { ContractMetadata } from '@/typings';
import { Contract } from '@/typings';
import { Exception } from '@/utils/Exception';
import { replaceRecursive } from '@/utils/replaceRecursive';
import * as PhalaSdk from '@phala/sdk';
import { ApiPromise, WsProvider } from '@polkadot/api';
import type { ApiOptions } from '@polkadot/api/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import fs from 'fs';
import path from 'path';


type WorkerInfo = {
    publicKey : string,
    ecdhPublicKey : string,
}

export type GetFactoryOptions = {
    clusterId? : string,
    contractType? : ContractType,
}


export class DevPhase
{
    
    public readonly api : ApiPromise;
    public readonly network : string;
    public readonly networkConfig : NetworkConfig;
    public readonly workerUrl : string;
    
    public readonly accounts : Accounts = {};
    public readonly suAccount : KeyringPair;
    public readonly suAccountCert : PhalaSdk.CertificateData;
    
    public readonly mainClusterId : string = '0x0000000000000000000000000000000000000000000000000000000000000000';
    
    public readonly runtimeContext : RuntimeContext;
    
    protected _apiProvider : WsProvider;
    protected _apiOptions : ApiOptions;
    protected _eventQueue : EventQueue = new EventQueue();
    protected _workerInfo : WorkerInfo;
    protected _systemContracts : Record<string, Promise<Contract>> = {};
    // clusterId => driverName => Contract
    protected _driverContracts : Record<string, Record<string, Promise<Contract>>> = {};
    
    
    private constructor () {}
    
    
    public static async create (
        runtimeContext : RuntimeContext,
        network : string
    ) : Promise<DevPhase>
    {
        // create instance
        const instance = new DevPhase();
        
        const networkConfig = runtimeContext.config.networks[network];
        if (!networkConfig) {
            throw new Exception(
                'Undefined network',
                1673537590278
            );
        }
        
        instance._apiOptions = networkConfig.nodeApiOptions;
        instance._apiProvider = new WsProvider(networkConfig.nodeUrl);
        
        const api = await instance.createApiPromise();
        await instance._eventQueue.init(api);
        
        Object.assign(instance, {
            network,
            networkConfig,
            runtimeContext,
            api,
            workerUrl: networkConfig.workerUrl,
        });
        
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
        
        const suAccountCert = await PhalaSdk.signCertificate({
            api,
            pair: suAccount,
        });
        
        Object.assign(instance, {
            accounts,
            suAccount,
            suAccountCert,
        });
        
        return instance;
    }
    
    public async createApiPromise () : Promise<ApiPromise>
    {
        return ApiPromise.create({
            provider: this._apiProvider,
            noInitWarn: true,
            ...this._apiOptions
        });
    }
    
    public async stackSetup () : Promise<void>
    {
        if (!this.runtimeContext) {
            throw new Exception(
                'Stack setup is not possible out of runtime context',
                1668741635272
            );
        }
        
        const stackSetupService = new StackSetupService(this);
        
        const result = await stackSetupService.setupStack(
            this.runtimeContext.config.stack.setupOptions
        );
        
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
    
    
    public async getFactory<T extends ContractFactory> (
        artifactPathOrName : string,
        options : GetFactoryOptions = {}
    ) : Promise<T>
    {
        options = {
            clusterId: this.mainClusterId,
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
                            this.suAccountCert,
                            {},
                            name
                        );
                        
                        if (output.isEmpty) {
                            throw new Exception(
                                'Driver contract is not ready',
                                1675762897876
                            );
                        }
                        
                        const contractId = '0x' + Buffer.from(output.unwrap()).toString('hex');
                        
                        const driverContractPath = path.join(
                            this.runtimeContext.paths.currentStack,
                            SystemContractFileMap[driverName]
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
                        .phalaFatContracts.clusters(clusterId);
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
    
}
