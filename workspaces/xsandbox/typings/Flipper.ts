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

export namespace InkEnv {
    export namespace Types {
        export type NoChainExtension = {

            };
    }
}

export namespace Flipper {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface Get extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<boolean, InkPrimitives.LangError>>>>;
        }
    }

    interface MapMessageQuery extends DPT.MapMessageQuery {
        get: ContractQuery.Get;
    }

    /** */
    /** Transactions */
    /** */
    namespace ContractTx {
        export interface Flip extends DPT.ContractTx {
            (options: ContractOptions): DPT.SubmittableExtrinsic;
        }
    }

    interface MapMessageTx extends DPT.MapMessageTx {
        flip: ContractTx.Flip;
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
        instantiate<T = Contract>(constructor: "new", params: [boolean], options?: DevPhase.InstantiateOptions): Promise<T>;
        instantiate<T = Contract>(constructor: "default", params: never[], options?: DevPhase.InstantiateOptions): Promise<T>;
    }
}
