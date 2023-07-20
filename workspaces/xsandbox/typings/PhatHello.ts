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
}

export namespace PhatHello {
    export type Error = {
        InvalidEthAddress? : null,
        HttpRequestFailed? : null,
        InvalidResponseBody? : null
        };
}

export namespace PhatHello {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface GetEthBalance extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, account: string): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<Result<string, PhatHello.Error>, InkPrimitives.LangError>>>>;
        }
    }

    interface MapMessageQuery extends DPT.MapMessageQuery {
        getEthBalance: ContractQuery.GetEthBalance;
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
        instantiate<T = Contract>(constructor: "new", params: never[], options?: DevPhase.InstantiateOptions): Promise<T>;
    }
}
