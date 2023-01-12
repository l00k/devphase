import type { Accounts, AccountsConfig, ContractType, DevPhaseOptions, NetworkConfig } from '@/def';
import { ContractFactory } from '@/service/api/ContractFactory';
import { EventQueue } from '@/service/api/EventQueue';
import { StackSetupService } from '@/service/api/StackSetupService';
import { AccountManager } from '@/service/project/AccountManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import type { ContractMetadata } from '@/typings';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import { replaceRecursive } from '@/utils/replaceRecursive';
import { ApiPromise, WsProvider } from '@polkadot/api';
import type { ApiOptions } from '@polkadot/api/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import fs from 'fs';
import * as net from 'net';
import path from 'path';


type WorkerInfo = {
    publicKey : string,
    ecdhPublicKey : string,
}

export type GetFactoryOptions = {
    clusterId? : string
}


export class DevPhase
{
    
    public readonly api : ApiPromise;
    public readonly network : string;
    public readonly networkConfig : NetworkConfig;
    public readonly workerUrl : string;
    
    public readonly accounts : Accounts = {};
    public readonly suAccount : KeyringPair;
    
    public readonly mainClusterId : string = '0x0000000000000000000000000000000000000000000000000000000000000000';
    
    public readonly runtimeContext : RuntimeContext;
    
    protected _logger : Logger = new Logger(DevPhase.name);
    
    protected _apiProvider : WsProvider;
    protected _apiOptions : ApiOptions;
    protected _eventQueue : EventQueue = new EventQueue();
    protected _workerInfo : WorkerInfo;
    
    
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
        
        Object.assign(instance, {
            accounts,
            suAccount: accounts[accountsConfig.suAccount],
        });
        
        return instance;
    }
    
    public async createApiPromise () : Promise<ApiPromise>
    {
        return ApiPromise.create({
            provider: this._apiProvider,
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
        type : ContractType,
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
                type,
                metadata,
                options.clusterId
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
    
}
