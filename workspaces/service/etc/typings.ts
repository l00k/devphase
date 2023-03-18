import type { Abi } from '@polkadot/api-contract';
import type * as Base from '@polkadot/api-contract/base/types';
import type { AbiMessage, ContractCallOutcome } from '@polkadot/api-contract/types';
import type { ApiBase } from '@polkadot/api/base';
import type * as Submittable from '@polkadot/api/submittable/types';
import type { DecorateMethod } from '@polkadot/api/types';
import type { AccountId } from '@polkadot/types/interfaces';
import type { Codec, AnyJson } from '@polkadot/types/types';

export * from '@polkadot/types-codec/types/interfaces';


export interface FixedArray<L extends number, T>
    extends ArrayLike<T>
{
    length : L
}

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
}

export interface MapMessageQuery
{
}


export interface SubmittableExtrinsic
    extends Submittable.SubmittableExtrinsic<'promise'>
{
}

export interface ContractTx
    extends MessageMeta
{
}

export interface MapMessageTx
{
}


export declare class Contract
{
    readonly contractId : string;
    readonly address : AccountId;
    
    constructor (
        api : ApiBase<'promise'>,
        abi : string | Record<string, unknown> | Abi,
        address : string | AccountId,
        decorateMethod : DecorateMethod<'promise'>
    );
    
    public get query () : MapMessageQuery;
    public get tx () : MapMessageTx;
}
