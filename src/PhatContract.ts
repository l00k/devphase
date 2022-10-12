import * as PhalaSdk from '@phala/sdk';
import { ContractPromise } from '@polkadot/api-contract';
import type * as Base from '@polkadot/api-contract/base/types';
import { ContractCallOutcome, ContractOptions } from '@polkadot/api-contract/types';


export interface ContractQuery
    extends Base.ContractQuery<'promise'>
{
    (
        certificateDate : PhalaSdk.CertificateData,
        options : ContractOptions,
        ...params : unknown[]
    ) : Base.ContractCallResult<'promise', ContractCallOutcome>;
}

export interface MapMessageQuery
    extends Base.MapMessageQuery<'promise'>
{
    [message : string] : ContractQuery;
}

export interface ContractTx
    extends Base.ContractTx<'promise'>
{
}

export interface MapMessageTx
    extends Base.MapMessageTx<'promise'>
{
    [message : string] : ContractTx;
}

export declare class PhatContract
    extends ContractPromise
{
    
    public readonly contractId : string;
    
    public get query () : MapMessageQuery;
    public get tx () : MapMessageTx;
    
}
