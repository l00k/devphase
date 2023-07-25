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
        export namespace HttpRequest {
            export interface HttpRequest {
                url: string;
                method: string;
                headers: [string, string][];
                body: number[] | string;
            }

            export interface HttpResponse {
                statusCode: number;
                reasonPhrase: string;
                headers: [string, string][];
                body: number[] | string;
            }

            export namespace HttpRequest$ {
                export interface Human {
                    url: string;
                    method: string;
                    headers: [string, string][];
                    body: number[] | string;
                }

                export interface Codec extends DPT.Json<PinkExtension.ChainExtension.HttpRequest.HttpRequest, PinkExtension.ChainExtension.HttpRequest.HttpRequest$.Human> {
                    url: PT.Text;
                    method: PT.Text;
                    headers: PT.Vec<PTT.ITuple<[PT.Text, PT.Text]>>;
                    body: PT.Vec<PT.U8>;
                }
            }

            export namespace HttpResponse$ {
                export interface Human {
                    statusCode: number;
                    reasonPhrase: string;
                    headers: [string, string][];
                    body: number[] | string;
                }

                export interface Codec extends DPT.Json<PinkExtension.ChainExtension.HttpRequest.HttpResponse, PinkExtension.ChainExtension.HttpRequest.HttpResponse$.Human> {
                    statusCode: PT.U16;
                    reasonPhrase: PT.Text;
                    headers: PT.Vec<PTT.ITuple<[PT.Text, PT.Text]>>;
                    body: PT.Vec<PT.U8>;
                }
            }
        }
    }
}

export namespace HttpProxy {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface Request extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                request: PinkExtension.ChainExtension.HttpRequest.HttpRequest | PinkExtension.ChainExtension.HttpRequest.HttpRequest$.Codec,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    PinkExtension.ChainExtension.HttpRequest.HttpResponse$.Codec,
                    InkPrimitives.LangError$.Codec
                >
            >;
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
    export declare class Factory extends DevPhase.ContractFactory<Contract> {
        instantiate(constructor: "new", params: never[], options?: DevPhase.InstantiateOptions): Promise<Contract>;
    }
}
