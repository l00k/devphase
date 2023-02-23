import type { AccountKey } from '@/def';
import { ContractType } from '@/def';
import { DevPhase } from '@/service/api/DevPhase';
import { EventQueue } from '@/service/api/EventQueue';
import { TxHandler } from '@/service/api/TxHandler';
import type { Contract, ContractMetadata } from '@/typings';
import { Exception } from '@/utils/Exception';
import { waitFor, WaitForOptions } from '@/utils/waitFor';
import * as PhalaSdk from '@phala/sdk';
import { ApiPromise } from '@polkadot/api';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import { KeyringPair } from '@polkadot/keyring/types';
import type { ContractInstantiateResult } from '@polkadot/types/interfaces/contracts';


export type CreateOptions = {
    contractType? : ContractType,
    clusterId? : string,
}

export type DeployOptions = {
    contractType? : ContractType,
    asAccount? : AccountKey | KeyringPair,
}

export type InstantiateOptions = {
    salt? : string | number,
    asAccount? : AccountKey | KeyringPair,
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
    
    protected _devPhase : DevPhase;
    protected _systemContract : Contract;
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
        metadata : ContractMetadata.Metadata,
        options : CreateOptions = {}
    ) : Promise<T>
    {
        const instance = new ContractFactory();
        
        instance._devPhase = devPhase;
        
        if (!options.clusterId) {
            options.clusterId = devPhase.mainClusterId;
        }
        
        Object.assign(instance, {
            metadata,
            contractType: options.contractType,
            clusterId: options.clusterId,
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
        
        const keyringPair : any = typeof options.asAccount === 'string'
            ? this._devPhase.accounts[options.asAccount]
            : options.asAccount;
        
        await TxHandler.handle(
            this.api.tx.phalaFatContracts.clusterUploadResource(
                this.clusterId,
                options.contractType || this.contractType,
                this.metadata.source.wasm
            ),
            keyringPair,
            true
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
        const salt = typeof options.salt == 'number'
            ? '0x' + options.salt.toString(16)
            : options.salt
        ;
        
        const keyringPair : any = typeof options.asAccount === 'string'
            ? this._devPhase.accounts[options.asAccount]
            : options.asAccount;
        
        const result = await TxHandler.handle(
            this.api.tx.phalaFatContracts.instantiateContract(
                { WasmCode: this.metadata.source.hash },
                callData,
                salt,
                this.clusterId,
                options.transfer,
                options.gasLimit,
                options.storageDepositLimit,
                options.deposit
            ),
            keyringPair,
            true
        );
        
        const instantiateEvent = result.events.find(({ event }) => {
            return event.section === 'phalaFatContracts'
                && event.method === 'Instantiating';
        });
        if (!instantiateEvent) {
            throw new Exception(
                'Error while instantiating contract',
                1675502920365
            );
        }
        
        const contractId = instantiateEvent.event.data[0].toString();
        
        // wait for instantation
        try {
            await this._waitFor(
                async() => {
                    const key = await this.api.query
                        .phalaRegistry.contractKeys(contractId);
                    return !key.isEmpty;
                },
                20_000
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
                keyringPair,
                true
            );
        }
        
        // adjust stake if specified
        if (options.adjustStake) {
            const result = await TxHandler.handle(
                this.api.tx.phalaFatTokenomic.adjustStake(
                    contractId,
                    options.adjustStake
                ),
                keyringPair,
                true
            );
        }
        
        return this.attach(contractId);
    }
    
    
    public async estimateInstatiationFee (
        constructor : string,
        params : any[] = [],
        options : InstantiateOptions
    ) : Promise<ContractInstantiateResult>
    {
        const systemContract = await this._devPhase.getSystemContract(this.clusterId);
        
        const abi = new Abi(this.metadata);
        const callData = abi.findConstructor(constructor).toU8a(params);
        const salt = typeof options.salt == 'number'
            ? '0x' + options.salt.toString(16)
            : options.salt
        ;
        
        const keyringPair : any = typeof options.asAccount === 'string'
            ? this._devPhase.accounts[options.asAccount]
            : options.asAccount;
        
        const cert = await PhalaSdk.signCertificate({
            api: <any>this.api,
            pair: keyringPair
        });
        
        const instantiateReturn = await systemContract.instantiate({
            codeHash: this.metadata.source.hash,
            salt,
            instantiateData: callData,
            deposit: options.deposit,
            transfer: options.transfer
        }, cert);
        
        const queryResponse : any = this.api.createType('InkResponse', instantiateReturn);
        const queryResult = queryResponse.result.toHuman();
        
        const instantiateResult = this.api.createType('ContractInstantiateResult', queryResult.Ok.InkMessageReturn);
        return <any>instantiateResult;
    }
    
    
    public async attach<T extends Contract> (
        contractId : string
    ) : Promise<T>
    {
        const api : any = await this._devPhase.createApiPromise();
        
        const phala : any = await PhalaSdk.create({
            api: api,
            baseURL: this._devPhase.workerUrl,
            contractId,
            autoDeposit: true,
        });
        
        const instance = new ContractPromise(
            phala.api,
            this.metadata,
            contractId,
        );
        
        Object.assign(instance, {
            contractId,
            clusterId: this.clusterId,
            sidevmQuery: phala.sidevmQuery,
            instantiate: phala.instantiate,
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
        
        const result = waitFor(
            callback,
            timeLimit,
            options
        );
        
        return result;
    }
    
}
