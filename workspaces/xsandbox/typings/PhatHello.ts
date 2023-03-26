import type * as PhalaSdk from "@phala/sdk";
import type * as DevPhase from "@devphase/service";
import type * as DPT from "@devphase/service/etc/typings";
import type { ContractCallResult, ContractQuery } from "@polkadot/api-contract/base/types";
import type { ContractCallOutcome, ContractOptions } from "@polkadot/api-contract/types";
import type { Codec } from "@polkadot/types/types";

export namespace PhatHello {
    type InkPrimitives_LangError$3 = { CouldNotReadInput: null };
    type Result$1 = { Ok: never[] } | { Err: InkPrimitives_LangError$3 };
    type PhatHello_PhatHello_Error$6 = { InvalidEthAddress: null } | { HttpRequestFailed: null } | { InvalidResponseBody: null };
    type Result$5 = { Ok: string } | { Err: PhatHello_PhatHello_Error$6 };
    type Result$4 = { Ok: Result$5 } | { Err: InkPrimitives_LangError$3 };

    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface GetEthBalance extends DPT.ContractQuery {
            (certificateData: PhalaSdk.CertificateData, options: ContractOptions, account: string): DPT.CallResult<DPT.CallOutcome<DPT.IJson<Result$4>>>;
        }
    }

    export interface MapMessageQuery extends DPT.MapMessageQuery {
        getEthBalance: ContractQuery.GetEthBalance;
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
