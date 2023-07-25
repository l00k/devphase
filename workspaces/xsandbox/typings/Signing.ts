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

export namespace Signing {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface Sign extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                message: string | PT.Text,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    PT.Vec<PT.U8>,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }

        export interface Verify extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                message: string | PT.Text,
                signature: number[] | string | PT.Vec<PT.U8>,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    PT.Bool,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }

        export interface Test extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                message: string | PT.Text,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    PTT.ITuple<[]>,
                    InkPrimitives.LangError$.Codec
                >
            >;
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
    export declare class Factory extends DevPhase.ContractFactory<Contract> {
        instantiate(constructor: "default", params: never[], options?: DevPhase.InstantiateOptions): Promise<Contract>;
    }
}
