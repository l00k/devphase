import type * as PhalaSdk from '@phala/sdk';
import type { ApiPromise } from '@polkadot/api';
import type { Abi, ContractPromise } from '@polkadot/api-contract';
import type * as Base from '@polkadot/api-contract/base/types';
import type { AbiMessage, ContractCallOutcome, ContractOptions } from '@polkadot/api-contract/types';
import type { ApiBase } from '@polkadot/api/base';
import type * as Submittable from '@polkadot/api/submittable/types';
import type { DecorateMethod } from '@polkadot/api/types';
import type * as PT from '@polkadot/types';
import type { AccountId } from '@polkadot/types/interfaces';
import type * as PTT from '@polkadot/types/types';


export type ToAnyJson<T> = T extends Object
    ? {
        [P in keyof T] : ToAnyJson<T[P]>
    }
    : T
    ;



export interface Json<N extends any, H extends any>
    extends PT.Json
{
    toHuman (isExtended? : boolean) : ToAnyJson<H>;
    
    toJSON () : ToAnyJson<N>;
    
    toPrimitive () : ToAnyJson<N>;
}


export interface Enum<T extends string, N extends any, H extends any, C extends PTT.Codec>
    extends PT.Enum
{
    type : T;
    inner : C;
    value : C;
    
    toHuman (isExtended? : boolean) : ToAnyJson<H>;
    
    toJSON () : ToAnyJson<N>;
    
    toPrimitive () : ToAnyJson<N>;
}


export interface Result<O extends Object, E extends Object>
{
    ok? : O;
    err? : E;
    
    [index : string] : any;
}

export namespace Result$
{
    export interface Human<O extends Object, E extends Object>
    {
        Ok? : O;
        Err? : E;
        
        [index : string] : any;
    }
    
    export interface Codec<O extends PTT.Codec, E extends PTT.Codec>
        extends PT.Result<O, E>
    {
        toHuman () : Result<ReturnType<O['toHuman']>, ReturnType<E['toHuman']>>;
        
        toJSON () : Result$.Human<ReturnType<O['toJSON']>, ReturnType<E['toJSON']>>;
        
        toPrimitive () : Result<ReturnType<O['toPrimitive']>, ReturnType<E['toPrimitive']>>;
    }
}


export interface Option<T extends Object>
{
    some? : T,
    none? : null,
    
    [index : string] : any;
}

export namespace Option$
{
    export interface Human<T extends Object>
    {
        Some? : T;
        None? : null;
        
        [index : string] : any;
    }
    
    export interface Codec<T extends PTT.Codec>
        extends PT.Option<T>
    {
        toHuman () : Option<ReturnType<T['toHuman']>>;
        
        toJSON () : Option$.Human<ReturnType<T['toJSON']>>;
        
        toPrimitive () : Option<ReturnType<T['toPrimitive']>>;
    }
}


export namespace InkStorage
{
    export namespace Lazy
    {
        export type Lazy<V, K> = V;
    }
}



export interface CallOutcome<T extends PTT.Codec = PTT.Codec>
    extends ContractCallOutcome
{
    output : T;
}

export interface CallResult<T>
    extends Base.ContractCallResult<'promise', T>
{
}

export type CallReturn<T extends PTT.Codec> = CallResult<CallOutcome<T>>;


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
    codeHash : string,
    salt : string,
    instantiateData : any,
    deposit : number,
    transfer : number,
};

export type InkInstantiateResult = {
    inkMessageReturn : any
};


export namespace InkInstantiateResult$
{
    export type Human = {
        InkMessageReturn : any
    };
}


export declare class Contract
    extends ContractPromise
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
    
    // @ts-ignore
    public get query () : MapMessageQuery;
    public get tx () : MapMessageTx;
    
    public sidevmQuery : PhalaSdk.SidevmQuery;
    
    public instantiate (
        instantiateOpts : InkInstantiateOpts,
        cert : PhalaSdk.CertificateData
    ) : CallReturn<Json<InkInstantiateResult, InkInstantiateResult$.Human>>;
    
}
