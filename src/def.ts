import type { ApiOptions } from '@polkadot/api/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { MochaOptions } from 'mocha';


export type RecursivePartial<T> = {
    [P in keyof T]? : T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object
            ? RecursivePartial<T[P]>
            : T[P];
};

export interface FixedArray<L extends number, T>
    extends ArrayLike<T>
{
    length : L
}

export type ComponentName = 'node' | 'pruntime' | 'pherry';

export enum SpawnMode
{
    Foreground = 'Foreground',
    Background = 'Background',
}

export interface StackComponentOptions
{
    binary : string,
    workingDir : string,
    args : Record<string, any>,
    envs : NodeJS.ProcessEnv,
    timeout : number
};

export interface NodeComponentOptions
    extends StackComponentOptions
{
    port : number,
}

export interface PruntimeComponentOptions
    extends StackComponentOptions
{
    port : number,
}

export interface PherryComponentOptions
    extends StackComponentOptions
{
    suMnemonic : string,
}


export type Accounts = {
    alice? : KeyringPair,
    bob? : KeyringPair,
    charlie? : KeyringPair,
    dave? : KeyringPair,
    eve? : KeyringPair,
    ferdie? : KeyringPair,
    [name : string] : KeyringPair,
}
export type AccountKey = keyof Accounts | string;

export type DevPhaseOptions = {
    nodeUrl? : string,
    nodeApiOptions? : ApiOptions,
    workerUrl? : string,
    accountsMnemonic? : string,
    accountsPaths? : Record<string, string>,
    sudoAccount? : string,
    ss58Prefix? : number,
    clusterId? : string,
    customEnvSetup? : (devPhase) => Promise<void>,
}

export type ProjectConfig = {
    directories : {
        contracts : string,
        tests : string,
        typings : string,
    },
    stack : {
        node : NodeComponentOptions,
        pruntime : PruntimeComponentOptions,
        pherry : PherryComponentOptions,
    },
    devPhaseOptions : DevPhaseOptions,
    mocha : MochaOptions
}

export type ProjectConfigOptions = RecursivePartial<ProjectConfig>;

export enum ContractType
{
    InkCode = 'InkCode',
    SidevmCode = 'SidevmCode',
}
