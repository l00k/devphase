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

export namespace InkEnv {
    export namespace Types {
        export type NoChainExtension = any;

        export namespace NoChainExtension$ {
            export type Enum = any;
            export type Human = any;
            export type Codec = any;
        }
    }
}

export namespace Flipper {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface Flip extends DPT.ContractQuery {
            (
                origin: DPT.ContractCallOrigin,
                options: DPT.ContractCallOptions,
            ): DPT.CallReturn<
                ContractExecResult
            >;
        }

        export interface Get extends DPT.ContractQuery {
            (
                origin: DPT.ContractCallOrigin,
                options: DPT.ContractCallOptions,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    PT.Bool,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }
    }

    interface MapMessageQuery extends DPT.MapMessageQuery {
        flip: ContractQuery.Flip;
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
    export declare class Factory extends DevPhase.ContractFactory<Contract> {
        instantiate(constructor: "new", params: [boolean | PT.Bool], options?: DevPhase.InstantiateOptions): Promise<Contract>;
        instantiate(constructor: "default", params: never[], options?: DevPhase.InstantiateOptions): Promise<Contract>;
    }
}
