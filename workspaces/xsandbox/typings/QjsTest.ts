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

export namespace PhatJs {
    export interface GenericValue {
        string?: string;
        bytes?: number[] | string;
        undefined?: null;
        [index: string]: any;
    }

    export namespace GenericValue$ {
        export enum Enum {
            String = "String",
            Bytes = "Bytes",
            Undefined = "Undefined"
        }

        export type Human = PhatJs.GenericValue$.Enum.Undefined & { [index: string]: any }
            | {
                String?: string,
                Bytes?: number[] | string
            };

        export interface Codec extends PT.Enum {
            type: Enum;
            inner: PT.Text | PT.Vec<PT.U8> | PTT.Codec;
            value: PT.Text | PT.Vec<PT.U8> | PTT.Codec;
            toHuman(isExtended?: boolean): Human;
            toJSON(): GenericValue;
            toPrimitive(): GenericValue;
        }
    }
}

export namespace PinkExtension {
    export namespace ChainExtension {
        export type PinkExt = any;

        export namespace PinkExt$ {
            export type Enum = any;
            export type Human = any;
            export type Codec = any;
        }
    }
}

export namespace QjsTest {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface Run extends DPT.ContractQuery {
            (
                origin: DPT.ContractCallOrigin,
                options: DPT.ContractCallOptions,
                args: string[] | PT.Vec<PT.Text>,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    PhatJs.GenericValue$.Codec,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }
    }

    interface MapMessageQuery extends DPT.MapMessageQuery {
        run: ContractQuery.Run;
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
        instantiate(constructor: "default", params: never[], options?: DevPhase.InstantiateOptions): Promise<Contract>;
    }
}
