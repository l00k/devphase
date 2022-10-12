import * as PhalaSdk from '@phala/sdk';
import { ContractPromise } from '@polkadot/api-contract';
import type * as Base from '@polkadot/api-contract/base/types';
import { ContractCallOutcome, ContractOptions } from '@polkadot/api-contract/types';
import type { ApiTypes } from '@polkadot/api/types';



export interface ContractQuery<ApiType extends ApiTypes>
    extends Base.ContractQuery<ApiType>
{
    (
        certificateDate : PhalaSdk.CertificateData,
        options : ContractOptions,
        ...params : unknown[]
    ) : Base.ContractCallResult<ApiType, ContractCallOutcome>;
}

export interface MapMessageQuery<ApiType extends ApiTypes>
    extends Base.MapMessageQuery<ApiType>
{
    [message : string] : ContractQuery<ApiType>;
}

export declare class PhatContract
    extends ContractPromise
{

    public readonly contractId : string;
    
    public get query () : MapMessageQuery<'promise'>;
    public get tx () : Base.MapMessageTx<'promise'>;
    
}
