import type * as PhalaSdk from "@phala/sdk";
import type * as DevPhase from "@devphase/service";
import type { ContractCallResult, ContractQuery } from "@polkadot/api-contract/base/types";
import type { ContractCallOutcome, ContractOptions } from "@polkadot/api-contract/types";
import type { ContractExecResult } from "@polkadot/types/interfaces/contracts";
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
        [index: string]: any;
    }

    export namespace LangError$ {
        export enum Enum {
            CouldNotReadInput = "CouldNotReadInput"
        }

        export type Human = InkPrimitives.LangError$.Enum.CouldNotReadInput & { [index: string]: any };

        export interface Codec extends PT.Enum {
            type: Enum;
            inner: PTT.Codec;
            value: PTT.Codec;
            toHuman(isExtended?: boolean): Human;
            toJSON(): LangError;
            toPrimitive(): LangError;
        }
    }
}

export namespace PhatHello {
    export interface Error {
        invalidEthAddress?: null;
        httpRequestFailed?: null;
        invalidResponseBody?: null;
        [index: string]: any;
    }

    export namespace Error$ {
        export enum Enum {
            InvalidEthAddress = "InvalidEthAddress",
            HttpRequestFailed = "HttpRequestFailed",
            InvalidResponseBody = "InvalidResponseBody"
        }

        export type Human = PhatHello.Error$.Enum.InvalidEthAddress & { [index: string]: any }
            | PhatHello.Error$.Enum.HttpRequestFailed & { [index: string]: any }
            | PhatHello.Error$.Enum.InvalidResponseBody & { [index: string]: any };

        export interface Codec extends PT.Enum {
            type: Enum;
            inner: PTT.Codec;
            value: PTT.Codec;
            toHuman(isExtended?: boolean): Human;
            toJSON(): Error;
            toPrimitive(): Error;
        }
    }
}

export namespace PhatHello {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface GetEthBalance extends DPT.ContractQuery {
            (
                origin: DPT.ContractCallOrigin,
                options: DPT.ContractCallOptions,
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
