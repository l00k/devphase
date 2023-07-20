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

export namespace InkPrimitives {
    export type LangError = {
        CouldNotReadInput? : null
        };

    export namespace Types {
        export type AccountId = any;
        export type Hash = any;
    }
}

export namespace PinkExtension {
    export namespace ChainExtension {
        export type PinkExt = {

            };
    }
}

export namespace Signing {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface Sign extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, message: string): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<number[] | string, InkPrimitives.LangError>>>>;
        }

        export interface Verify extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, message: string, signature: number[] | string): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<boolean, InkPrimitives.LangError>>>>;
        }

        export interface Test extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, message: string): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<never[], InkPrimitives.LangError>>>>;
        }
    }

    interface MapMessageQuery extends DPT.MapMessageQuery {
        sign: ContractQuery.Sign;
        verify: ContractQuery.Verify;
        test: ContractQuery.Test;
    }

    /** */
    /** Transactions */
    /** */
    namespace ContractTx {
    }

    interface MapMessageTx extends DPT.MapMessageTx {
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
