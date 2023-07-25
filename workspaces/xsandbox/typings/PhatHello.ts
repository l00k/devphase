import type * as PhalaSdk from "@phala/sdk";
import type * as DevPhase from "@devphase/service";
import type { ContractCallResult, ContractQuery } from "@polkadot/api-contract/base/types";
import type { ContractCallOutcome, ContractOptions } from "@polkadot/api-contract/types";
import type * as DPT from "@devphase/service/etc/typings";
import type * as PT from "@polkadot/types";
import type * as PTI from "@polkadot/types/interfaces";
import type * as PTT from "@polkadot/types/types";


/** */
/** Exported types */
/** */

export namespace InkPrimitives {
    export interface LangError {
        couldNotReadInput?: null;
    }

    export namespace LangError$ {
        export enum Enum {
            CouldNotReadInput = "CouldNotReadInput"
        }

        export type Human = InkPrimitives.LangError$.Enum.CouldNotReadInput;
        export type Codec = DPT.Enum<InkPrimitives.LangError$.Enum.CouldNotReadInput, never, never, PTT.Codec>;
    }
}

export namespace PhatHello {
    export interface Error {
        invalidEthAddress?: null;
        httpRequestFailed?: null;
        invalidResponseBody?: null;
    }

    export namespace Error$ {
        export enum Enum {
            InvalidEthAddress = "InvalidEthAddress",
            HttpRequestFailed = "HttpRequestFailed",
            InvalidResponseBody = "InvalidResponseBody"
        }

        export type Human = PhatHello.Error$.Enum.InvalidEthAddress
            | PhatHello.Error$.Enum.HttpRequestFailed
            | PhatHello.Error$.Enum.InvalidResponseBody;
        export type Codec = DPT.Enum<PhatHello.Error$.Enum.InvalidEthAddress, never, never, PTT.Codec>
            | DPT.Enum<PhatHello.Error$.Enum.HttpRequestFailed, never, never, PTT.Codec>
            | DPT.Enum<PhatHello.Error$.Enum.InvalidResponseBody, never, never, PTT.Codec>;
    }
}

export namespace PhatHello {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface GetEthBalance extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                account: string | PT.Text,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    DPT.Result$.Codec<
                        PT.Text,
                        PhatHello.Error$.Codec
                    >,
                    InkPrimitives.LangError$.Codec
                >
            >;
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
    export declare class Factory extends DevPhase.ContractFactory<Contract> {
        instantiate(constructor: "new", params: never[], options?: DevPhase.InstantiateOptions): Promise<Contract>;
    }
}
