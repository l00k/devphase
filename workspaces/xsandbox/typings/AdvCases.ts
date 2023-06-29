import type * as PhalaSdk from "@phala/sdk";
import type * as DevPhase from "@devphase/service";
import type * as DPT from "@devphase/service/etc/typings";
import type { ContractCallResult, ContractQuery } from "@polkadot/api-contract/base/types";
import type { ContractCallOutcome, ContractOptions } from "@polkadot/api-contract/types";
import type { Codec } from "@polkadot/types/types";

export namespace AdvCases {
    type InkPrimitives_LangError$3 = {
        CouldNotReadInput? : null
        };
    type Result$1 = {
        Ok? : never[],
        Err? : InkPrimitives_LangError$3
        };
    type AdvCases_AdvCases_Role$5 = {
        User? : null,
        Admin? : null
        };
    type AdvCases_AdvCases_User$4 = { active: boolean, name: string, role: AdvCases_AdvCases_Role$5, age: number, salery: number, favorite_numbers: number[] | string };
    type Result$6 = {
        Ok? : AdvCases_AdvCases_User$4,
        Err? : InkPrimitives_LangError$3
        };
    type Result$7 = {
        Ok? : [ number, number, number, number ],
        Err? : InkPrimitives_LangError$3
        };
    type AdvCases_AdvCases_Error$11 = {
        NotFound? : null,
        Unknonw? : null
        };
    type Result$10 = {
        Ok? : AdvCases_AdvCases_User$4,
        Err? : AdvCases_AdvCases_Error$11
        };
    type Result$9 = {
        Ok? : Result$10,
        Err? : InkPrimitives_LangError$3
        };
    type Result$12 = {
        Ok? : number[] | string,
        Err? : InkPrimitives_LangError$3
        };
    type Result$13 = {
        Ok? : [ number, string ],
        Err? : InkPrimitives_LangError$3
        };
    type AdvCases_AdvCases_Error2$15 = {

        };
    type Result$16 = {
        Ok? : number,
        Err? : InkPrimitives_LangError$3
        };
    type InkPrimitives_Types_AccountId$17 = any;
    type InkPrimitives_Types_Hash$18 = any;
    type PinkExtension_ChainExtension_PinkExt$19 = {

        };

    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface GetUser extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, idx: number): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result$6>>>;
        }

        export interface GetIntegers extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result$7>>>;
        }

        export interface GetUserByResult extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, idx: number): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result$9>>>;
        }

        export interface GetArray extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, text: string): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result$12>>>;
        }

        export interface GetTuple extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, text: string): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result$13>>>;
        }

        export interface Sample extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, value: AdvCases_AdvCases_Error2$15): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result$16>>>;
        }

        export interface HandleReq extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result$1>>>;
        }
    }

    export interface MapMessageQuery extends DPT.MapMessageQuery {
        getUser: ContractQuery.GetUser;
        getIntegers: ContractQuery.GetIntegers;
        getUserByResult: ContractQuery.GetUserByResult;
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
            (options: ContractOptions, user: AdvCases_AdvCases_User$4): DPT.SubmittableExtrinsic;
        }
    }

    export interface MapMessageTx extends DPT.MapMessageTx {
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
