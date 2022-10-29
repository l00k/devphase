import { ContractMetadata, ContractType } from '@/def';
import { AccountKey, DevPhase } from '@/service/DevPhase';
import { Contract } from '@/typings';
import { EventQueue } from '@/utils/EventQueue';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import { TxHandler } from '@/utils/TxHandler';
import { waitFor, WaitForOptions } from '@/utils/waitFor';
import * as PhalaSdk from '@phala/sdk';
import { ApiPromise } from '@polkadot/api';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import type { IEvent } from '@polkadot/types/types';
import chalk from 'chalk';



export type DeployOptions = {
    asAccount? : AccountKey,
}

export type InstantiateOptions = {
    salt? : number,
    asAccount? : AccountKey,
}

export type AttachOptions = {}


export class ContractFactory
{
    
    public readonly contractType : string;
    public readonly metadata : ContractMetadata.Metadata;
    public readonly clusterId : string;
    
    protected _logger : Logger = new Logger('ContractFactory');
    protected _devPhase : DevPhase;
    protected _eventQueue : EventQueue = new EventQueue();
    
    
    
    public get api () : ApiPromise
    {
        return this._devPhase.api;
    }
    
    protected async init (api : ApiPromise)
    {
        await this._eventQueue.init(api);
    }
    
    
    public static async create<T extends ContractFactory> (
        devPhase : DevPhase,
        contractType : ContractType,
        metadata : ContractMetadata.Metadata,
        clusterId : string
    ) : Promise<T>
    {
        const instance = new ContractFactory();
        
        instance._devPhase = devPhase;
        
        Object.assign(instance, {
            contractType,
            metadata,
            clusterId,
        });
        
        await instance.init(devPhase.api);
        
        return <any> instance;
    }
    
    
    /**
     * Deploying contract to network
     */
    public async deploy (
        options : DeployOptions = {}
    ) : Promise<void>
    {
        options = {
            asAccount: 'alice',
        };
        
        const result = await TxHandler.handle(
            this.api.tx.phalaFatContracts.clusterUploadResource(
                this.clusterId,
                this.contractType,
                this.metadata.source.wasm
            ),
            this._devPhase.accounts[options.asAccount],
            'phalaFatContracts.clusterUploadResource'
        );
    }
    
    
    /**
     * Creating contract instance
     */
    public async instantiate<T extends Contract> (
        constructor : string,
        params : any[] = [],
        options : InstantiateOptions = {}
    ) : Promise<T>
    {
        options = {
            salt: 1000000000 + Math.round(Math.random() * 8999999999),
            asAccount: 'alice',
            ...options
        };
        
        const abi = new Abi(this.metadata);
        const callData = abi.findConstructor(constructor).toU8a(params);
        
        const result = await TxHandler.handle(
            this.api.tx.phalaFatContracts.instantiateContract(
                { WasmCode: this.metadata.source.hash },
                callData,
                '0x' + options.salt.toString(16),
                this.clusterId,
            ),
            this._devPhase.accounts[options.asAccount],
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
            await this.api.query.phalaRegistry.clusterKeys(this.clusterId)
        ).toJSON();
        
        const contractKey = (
            await this.api.query.phalaRegistry.contractKeys(contractId)
        ).toJSON();
        
        return this.attach(contractId);
    }
    
    public async attach<T extends Contract> (
        contractId : string,
        options : AttachOptions = {}
    ) : Promise<T>
    {
        const workerApi : ApiPromise = await PhalaSdk.create({
            api: this.api,
            baseURL: this._devPhase.workerUrl,
            contractId
        });
        
        const instance = new ContractPromise(
            workerApi,
            this.metadata,
            contractId,
        );
        
        Object.assign(instance, {
            contractId
        });
        
        return <any>instance;
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
