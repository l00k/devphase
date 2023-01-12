import type { AccountKey, ContractType } from '@/def';
import { DevPhase } from '@/service/api/DevPhase';
import { EventQueue } from '@/service/api/EventQueue';
import { TxHandler } from '@/service/api/TxHandler';
import type { Contract, ContractMetadata } from '@/typings';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
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
    transfer? : number,
    gasLimit? : number,
    storageDepositLimit? : number,
    deposit? : number,
    transferToCluster? : number,
    adjustStake? : number,
}


export class ContractFactory
{
    
    public readonly contractType : string;
    public readonly metadata : ContractMetadata.Metadata;
    public readonly clusterId : string;
    
    protected _logger : Logger = new Logger(ContractFactory.name);
    protected _devPhase : DevPhase;
    protected _eventQueue : EventQueue = new EventQueue();
    
    
    
    public get api () : ApiPromise
    {
        return this._devPhase.api;
    }
    
    protected async init ()
    {
        await this._eventQueue.init(this._devPhase.api);
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
        
        if (!clusterId) {
            clusterId = devPhase.mainClusterId;
        }
        
        Object.assign(instance, {
            contractType,
            metadata,
            clusterId,
        });
        
        await instance.init();
        
        return <any>instance;
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
            ...options
        };
        
        await TxHandler.handle(
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
            transfer: 0,
            gasLimit: 1e12,
            storageDepositLimit: null,
            deposit: 0,
            transferToCluster: 1e12,
            adjustStake: 1e12,
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
                options.transfer,
                options.gasLimit,
                options.storageDepositLimit,
                options.deposit
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
                20_000,
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
        
        // transfer funds to cluster if specified
        if (options.transferToCluster) {
            const result = await TxHandler.handle(
                this.api.tx.phalaFatContracts.transferToCluster(
                    options.transferToCluster,
                    this.clusterId,
                    contractId
                ),
                this._devPhase.accounts[options.asAccount],
                'phalaFatContracts.transferToCluster'
            );
        }
        
        // adjust stake if specified
        if (options.adjustStake) {
            const result = await TxHandler.handle(
                this.api.tx.phalaFatTokenomic.adjustStake(
                    contractId,
                    options.adjustStake
                ),
                this._devPhase.accounts[options.asAccount],
                'phalaFatTokenomic.adjustStake'
            );
        }
        
        return this.attach(contractId);
    }
    
    public async attach<T extends Contract> (
        contractId : string
    ) : Promise<T>
    {
        const api = await this._devPhase.createApiPromise();
        
        const { api: workerApi } = await PhalaSdk.create({
            api: <any>api,
            baseURL: this._devPhase.workerUrl,
            contractId,
            autoDeposit: true,
        });
        
        const instance = new ContractPromise(
            <any>workerApi,
            this.metadata,
            contractId,
        );
        
        Object.assign(instance, {
            contractId,
            clusterId: this.clusterId,
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
