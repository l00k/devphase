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

export namespace PinkExtension {
    export namespace ChainExtension {
        export namespace HttpRequest {
            export type HttpRequest = {
                url: string,
                method: string,
                headers: [ string, string ][],
                body: number[] | string
                };
            export type HttpResponse = {
                status_code: number,
                reason_phrase: string,
                headers: [ string, string ][],
                body: number[] | string
                };
        }
    }
}

export namespace HttpProxy {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface Request extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, request: PinkExtension.ChainExtension.HttpRequest.HttpRequest): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result<PinkExtension.ChainExtension.HttpRequest.HttpResponse, InkPrimitives.LangError>>>>;
        }
    }

    interface MapMessageQuery extends DPT.MapMessageQuery {
        request: ContractQuery.Request;
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
