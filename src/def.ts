import type { ApiOptions } from '@polkadot/api/types';
import type { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types';
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

export enum RunMode
{
    Simple = 'Simple',
    Testing = 'Testing',
}

export interface StackComponentOptions
{
    binary : string,
    workingDir : string,
    args : Record<string, any>,
    envs : NodeJS.ProcessEnv,
    timeout : number,
}

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
    gkMnemonic : string,
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


export type AccountKeyringsConfig = {
    [name : string] : string | KeyringPair$Json,
};

export type AccountsConfig = {
    keyrings : AccountKeyringsConfig,
    suAccount : string,
};


export type NetworkConfig = {
    nodeUrl : string,
    nodeApiOptions? : ApiOptions,
    workerUrl : string,
    blockTime : number,
};

export type StackSetupOptions = {
    workerUrl? : string,
    clusterId? : string,
};

export type StackSetupResult = {
    clusterId : string,
};

export type DevPhaseOptions = NetworkConfig & StackSetupOptions;


export interface TestingOptions
{
    mocha : MochaOptions,
    spawnStack : boolean,
    envSetup : {
        setup : {
            custom : (devPhase : any) => Promise<void>,
            timeout : number,
        },
        teardown : {
            custom : (devPhase : any) => Promise<void>,
            timeout : number,
        }
    },
    blockTime : number,
    stackLogOutput : boolean,
}


export type GeneralConfig = {
    ss58Format : number,
};


export type ProjectConfig = {
    general : GeneralConfig,
    directories : {
        artifacts : string,
        contracts : string,
        logs : string,
        stacks : string,
        tests : string,
        typings : string,
    },
    stack : {
        blockTime : number,
        version : string,
        setupOptions : StackSetupOptions,
        node : NodeComponentOptions,
        pruntime : PruntimeComponentOptions,
        pherry : PherryComponentOptions,
    },
    testing : TestingOptions,
    networks : {
        [networkName : string] : NetworkConfig,
    },
    accountsConfig : AccountsConfig,
}
export type ProjectConfigOptions = RecursivePartial<ProjectConfig>;


export type RuntimePaths = {
    devphase : string,
    templates : string,
    project : string,
    context : string,
    
    artifacts : string,
    contracts : string,
    logs : string,
    currentLog : string,
    scripts : string,
    stacks : string,
    currentStack : string,
    tests : string,
    typings : string,
}

export enum ContractType
{
    InkCode = 'InkCode',
    SidevmCode = 'SidevmCode',
}
