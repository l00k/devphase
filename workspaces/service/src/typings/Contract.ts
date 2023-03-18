import type * as PhalaSdk from '@phala/sdk';
import { ApiPromise } from '@polkadot/api';
import type { Abi } from '@polkadot/api-contract';
import type * as Base from '@polkadot/api-contract/base/types';
import type { AbiMessage, ContractCallOutcome, ContractOptions } from '@polkadot/api-contract/types';
import type { ApiBase } from '@polkadot/api/base';
import type * as Submittable from '@polkadot/api/submittable/types';
import type { DecorateMethod } from '@polkadot/api/types';
import type { AccountId } from '@polkadot/types/interfaces';
import type { AnyJson, Codec } from '@polkadot/types/types';


export interface IJson<T extends AnyJson>
    extends Codec
{
    toHuman (isExtended? : boolean) : T;
    
    toJSON () : T;
    
    toPrimitive () : T;
}


export interface CallOutcome<T extends Codec = Codec>
    extends ContractCallOutcome
{
    output : T;
}

export interface CallResult<T>
    extends Base.ContractCallResult<'promise', T>
{
}


export interface MessageMeta
{
    readonly meta : AbiMessage;
}


export interface ContractQuery
    extends MessageMeta
{
    (certificateData : PhalaSdk.CertificateData, options : ContractOptions, ...params : any[]) : CallResult<CallOutcome<any>>;
}

export interface MapMessageQuery
{
    [name : string] : ContractQuery;
}


export interface SubmittableExtrinsic
    extends Submittable.SubmittableExtrinsic<'promise'>
{
}

export interface ContractTx
    extends MessageMeta
{
    (options : ContractOptions, ...params : any[]) : SubmittableExtrinsic;
}

export interface MapMessageTx
{
    [name : string] : ContractTx;
}


export type InkInstantiateOpts = {
    codeHash: string,
    salt: string,
    instantiateData: any,
    deposit: number,
    transfer: number,
};

export type InkInstantiateResult = {
    InkMessageReturn: any
};

export declare class Contract
{
    
    public readonly api : ApiPromise;
    public readonly clusterId : string;
    public readonly contractId : string;
    
    constructor (
        api : ApiBase<'promise'>,
        abi : string | Record<string, unknown> | Abi,
        address : string | AccountId,
        decorateMethod : DecorateMethod<'promise'>
    );
    
    public get query () : MapMessageQuery;
    public get tx () : MapMessageTx;
    
    public sidevmQuery : PhalaSdk.SidevmQuery;
    
    public instantiate(
        instantiateOpts : InkInstantiateOpts,
        cert : PhalaSdk.CertificateData
    ) : CallResult<CallOutcome<IJson<InkInstantiateResult>>>;
    
}
