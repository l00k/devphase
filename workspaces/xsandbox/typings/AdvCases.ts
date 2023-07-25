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

export namespace AdvCases {
    export interface Role {
        user?: null;
        admin?: number;
    }

    export interface User {
        active: boolean;
        name: string;
        role: AdvCases.Role;
        age: number;
        salery: number;
        favoriteNumbers: number[] | string;
    }

    export interface Error {
        notFound?: null;
        unknown?: null;
    }

    export interface Error2 {
        sample?: number;
    }

    export namespace Role$ {
        export enum Enum {
            User = "User",
            Admin = "Admin"
        }

        export type Human = AdvCases.Role$.Enum.User
            | {
                Admin?: number
            };
        export type Codec = DPT.Enum<AdvCases.Role$.Enum.User, never, never, PTT.Codec>
            | DPT.Enum<AdvCases.Role$.Enum.Admin, number, number, PT.U8>;
    }

    export namespace User$ {
        export interface Human {
            active: boolean;
            name: string;
            role: AdvCases.Role$.Human;
            age: number;
            salery: number;
            favoriteNumbers: number[] | string;
        }

        export interface Codec extends DPT.Json<AdvCases.User, AdvCases.User$.Human> {
            active: PT.Bool;
            name: PT.Text;
            role: AdvCases.Role$.Codec;
            age: PT.U8;
            salery: PT.U64;
            favoriteNumbers: PT.Vec<PT.U32>;
        }
    }

    export namespace Error$ {
        export enum Enum {
            NotFound = "NotFound",
            Unknown = "Unknown"
        }

        export type Human = AdvCases.Error$.Enum.NotFound
            | AdvCases.Error$.Enum.Unknown;
        export type Codec = DPT.Enum<AdvCases.Error$.Enum.NotFound, never, never, PTT.Codec>
            | DPT.Enum<AdvCases.Error$.Enum.Unknown, never, never, PTT.Codec>;
    }

    export namespace Error2$ {
        export enum Enum {
            Sample = "Sample"
        }

        export type Human = {
            Sample?: number
        };
        export type Codec = DPT.Enum<AdvCases.Error2$.Enum.Sample, number, number, PT.U8>;
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

export namespace AdvCases {
    /** */
    /** Queries */
    /** */
    namespace ContractQuery {
        export interface GetUser extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                idx: number | PT.U32,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    DPT.Option$.Codec<
                        AdvCases.User$.Codec
                    >,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }

        export interface GetSampleUser extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                idx: number | PT.U64,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    AdvCases.User$.Codec,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }

        export interface GetSampleAdmin extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                idx: number | PT.U8,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    AdvCases.User$.Codec,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }

        export interface GetIntegers extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    PTT.ITuple<[PT.U8, PT.U128, PT.I8, PT.I128]>,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }

        export interface GetUserByResult extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                idx: number | PT.U32,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    DPT.Result$.Codec<
                        AdvCases.User$.Codec,
                        AdvCases.Error$.Codec
                    >,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }

        export interface GetLazyUser extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    DPT.Option$.Codec<
                        AdvCases.User$.Codec
                    >,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }

        export interface GetArray extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                text: string | PT.Text,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    PT.Vec<PT.U64>,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }

        export interface GetTuple extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                text: string | PT.Text,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    PTT.ITuple<[PT.U64, PT.Text]>,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }

        export interface Sample extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
                value: number | PT.U8,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    DPT.Result$.Codec<
                        PT.U8,
                        AdvCases.Error2$.Codec
                    >,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }

        export interface HandleReq extends DPT.ContractQuery {
            (
                certificateData: PhalaSdk.CertificateData,
                options: ContractOptions,
            ): DPT.CallReturn<
                DPT.Result$.Codec<
                    PTT.ITuple<[]>,
                    InkPrimitives.LangError$.Codec
                >
            >;
        }
    }

    interface MapMessageQuery extends DPT.MapMessageQuery {
        getUser: ContractQuery.GetUser;
        getSampleUser: ContractQuery.GetSampleUser;
        getSampleAdmin: ContractQuery.GetSampleAdmin;
        getIntegers: ContractQuery.GetIntegers;
        getUserByResult: ContractQuery.GetUserByResult;
        getLazyUser: ContractQuery.GetLazyUser;
        getArray: ContractQuery.GetArray;
        getTuple: ContractQuery.GetTuple;
        sample: ContractQuery.Sample;
        handleReq: ContractQuery.HandleReq;
    }

    /** */
    /** Transactions */
    /** */
    namespace ContractTx {
        export interface Add extends DPT.ContractTx {
            (options: ContractOptions, user: AdvCases.User): DPT.SubmittableExtrinsic;
        }
    }

    interface MapMessageTx extends DPT.MapMessageTx {
        add: ContractTx.Add;
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
