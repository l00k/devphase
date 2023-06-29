import type * as PhalaSdk from "@phala/sdk";
import type * as DevPhase from "@devphase/service";
import type * as DPT from "@devphase/service/etc/typings";
import type { ContractCallResult, ContractQuery } from "@polkadot/api-contract/base/types";
import type { ContractCallOutcome, ContractOptions } from "@polkadot/api-contract/types";
import type { Codec } from "@polkadot/types/types";

export namespace HttpProxy {
    type InkPrimitives_LangError$3 = {
        CouldNotReadInput? : null
        };
    type Result$1 = {
        Ok? : never[],
        Err? : InkPrimitives_LangError$3
        };
    type PinkExtension_ChainExtension_HttpRequest_HttpRequest$4 = { url: string, method: string, headers: [ string, string ][], body: number[] | string };
    type PinkExtension_ChainExtension_HttpRequest_HttpResponse$7 = { status_code: number, reason_phrase: string, headers: [ string, string ][], body: number[] | string };
    type Result$6 = {
        Ok? : PinkExtension_ChainExtension_HttpRequest_HttpResponse$7,
        Err? : InkPrimitives_LangError$3
        };

    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface Request extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, request: PinkExtension_ChainExtension_HttpRequest_HttpRequest$4): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result$6>>>;
        }
    }

    export interface MapMessageQuery extends DPT.MapMessageQuery {
        request: ContractQuery.Request;
    }

    /** */
    /** Transactions */
    /** */
    namespace ContractTx {
    }

    export interface MapMessageTx extends DPT.MapMessageTx {
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
