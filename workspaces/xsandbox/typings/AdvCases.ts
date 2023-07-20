import type * as PhalaSdk from "@phala/sdk";
import type * as DevPhase from "@devphase/service";
import type * as DPT from "@devphase/service/etc/typings";
import type { ContractCallResult, ContractQuery } from "@polkadot/api-contract/base/types";
import type { ContractCallOutcome, ContractOptions } from "@polkadot/api-contract/types";
import type { Codec } from "@polkadot/types/types";


/** */
/** Exported types */
/** */
export type Result<Ok, Err> = {
    Ok? : Ok,
    Err? : Err
    };
export type Option<Some> = {
    None? : null,
    Some? : Some
    };

export namespace InkPrimitives {
    export type LangError = {
        CouldNotReadInput? : null
        };

    export namespace Types {
        export type AccountId = any;
        export type Hash = any;
    }
}

export namespace AdvCases {
    export type Role = {
        User? : null,
        Admin? : null
        };
    export type User = {
        active: boolean,
        name: string,
        role: AdvCases.Role,
        age: number,
        salery: number,
        favorite_numbers: number[] | string
        };
    export type Error = {
        NotFound? : null,
        Unknonw? : null
        };
    export type Error2 = {

        };
}

export namespace PinkExtension {
    export namespace ChainExtension {
        export type PinkExt = {

            };
    }
}

export namespace AdvCases {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface GetUser extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, idx: number): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<AdvCases.User, InkPrimitives.LangError>>>>;
        }

        export interface GetIntegers extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<[ number, number, number, number ], InkPrimitives.LangError>>>>;
        }

        export interface GetUserByResult extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, idx: number): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<Result<AdvCases.User, AdvCases.Error>, InkPrimitives.LangError>>>>;
        }

        export interface GetLazyUser extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<Option<AdvCases.User>, InkPrimitives.LangError>>>>;
        }

        export interface GetArray extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, text: string): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<number[] | string, InkPrimitives.LangError>>>>;
        }

        export interface GetTuple extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, text: string): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<[ number, string ], InkPrimitives.LangError>>>>;
        }

        export interface Sample extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, value: AdvCases.Error2): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<number, InkPrimitives.LangError>>>>;
        }

        export interface HandleReq extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<never[], InkPrimitives.LangError>>>>;
        }
    }

    interface MapMessageQuery extends DPT.MapMessageQuery {
        getUser: ContractQuery.GetUser;
        getIntegers: ContractQuery.GetIntegers;
        getUserByResult: ContractQuery.GetUserByResult;
        getLazyUser: ContractQuery.GetLazyUser;
        getArray: ContractQuery.GetArray;
        getTuple: ContractQuery.GetTuple;
        sample: ContractQuery.Sample;
        handleReq: ContractQuery.HandleReq;
    }

    /** */
    /** Transactions */
    /** */
    namespace ContractTx {
        export interface Add extends DPT.ContractTx {
            (options: ContractOptions, user: AdvCases.User): DPT.SubmittableExtrinsic;
        }
    }

    interface MapMessageTx extends DPT.MapMessageTx {
        add: ContractTx.Add;
    }

    /** */
    /** Contract */
    /** */
    export declare class Contract extends DPT.Contract {
        get query(): MapMessageQuery;
        get tx(): MapMessageTx;
    }

    /** */
    /** Contract factory */
    /** */
    export declare class Factory extends DevPhase.ContractFactory {
        instantiate<T = Contract>(constructor: "default", params: never[], options?: DevPhase.InstantiateOptions): Promise<T>;
    }
}
