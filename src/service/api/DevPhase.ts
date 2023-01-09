import type { Accounts, ContractType, DevPhaseOptions } from '@/def';
import { ContractFactory } from '@/service/api/ContractFactory';
import { EventQueue } from '@/service/api/EventQueue';
import { StackSetupService } from '@/service/api/StackSetupService';
import { AccountsManager } from '@/service/project/AccountsManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import type { ContractMetadata } from '@/typings';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import { replaceRecursive } from '@/utils/replaceRecursive';
import { types as PhalaSDKTypes } from '@phala/sdk';
import { khalaDev as KhalaTypes } from '@phala/typedefs';
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
    clusterId? : string
}


export class DevPhase
{
    
    public readonly api : ApiPromise;
    public readonly options : DevPhaseOptions;
    public readonly workerUrl : string;
    
    public readonly accounts : Accounts = {};
    public readonly suAccount : KeyringPair;
    
    public readonly mainClusterId : string;
    
    public readonly runtimeContext : RuntimeContext;
    
    protected _logger : Logger = new Logger(DevPhase.name);
    
    protected _apiProvider : WsProvider;
    protected _apiOptions : ApiOptions;
    protected _eventQueue : EventQueue = new EventQueue();
    protected _workerInfo : WorkerInfo;
    
    
    private constructor () {}
    
    
    public static async create (
        options : DevPhaseOptions = {},
        runtimeContext? : RuntimeContext
    ) : Promise<DevPhase>
    {
        options = replaceRecursive({
            nodeUrl: 'ws://localhost:9944',
            nodeApiOptions: {
                types: {
                    ...KhalaTypes,
                    ...PhalaSDKTypes,
                }
            },
            workerUrl: 'http://localhost:8000',
            accountsConfig: {
                keyrings: {
                    alice: '//Alice',
                    bob: '//Bob',
                    charlie: '//Charlie',
                    dave: '//Dave',
                    eve: '//Eve',
                    ferdie: '//Ferdie',
                },
                suAccount: 'alice',
            },
            clusterId: undefined,
        }, options);
        
        // create instance
        const instance = new DevPhase();
        
        instance._apiOptions = options.nodeApiOptions;
        instance._apiProvider = new WsProvider(options.nodeUrl);
        
        const api = await instance.createApiPromise();
        await instance._eventQueue.init(api);
        
        Object.assign(instance, {
            options,
            runtimeContext,
            api,
            workerUrl: options.workerUrl,
        });
        
        // load accounts
        const accountsManager = new AccountsManager();
        let ss58Format : number = 30;
        
        if (runtimeContext) {
            const accountsKeyrings = await accountsManager.loadAccountsKeyringsFromConfigFile(runtimeContext);
            if (accountsKeyrings) {
                replaceRecursive(
                    options.accountsConfig.keyrings,
                    accountsKeyrings
                );
            }
            
            ss58Format = runtimeContext.config.general.ss58Format;
        }
        
        const accounts = await accountsManager.loadAccounts(
            options.accountsConfig.keyrings,
            ss58Format,
            true
        );
        
        Object.assign(instance, {
            accounts,
            suAccount: accounts[options.accountsConfig.suAccount],
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
            if (!this.runtimeContext) {
                throw new Exception(
                    'It is not allowed to use contract name in this context',
                    1667493436149
                );
            }
            
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
