import { MochaOptions } from 'mocha';

type RecursivePartial<T> = {
    [P in keyof T]? : T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object
            ? RecursivePartial<T[P]>
            : T[P];
};



export type ComponentName = 'node' | 'pruntime' | 'pherry';

export enum SpawnMode
{
    Foreground = 'Foreground',
    Background = 'Background',
}

export type BinarySpawnOptions = {
    args : Record<string, any>,
    envs : NodeJS.ProcessEnv,
    timeout : number
};

export type Config = {
    directories : {
        contracts : string,
        tests : string,
    },
    stack : Record<ComponentName, BinarySpawnOptions>,
    mocha : MochaOptions
}

export type ConfigOption = RecursivePartial<Config>;

export enum ContractType
{
    InkCode = 'InkCode',
    SidevmCode = 'SidevmCode',
}

export type ContractAbi = {
    source : {
        hash : string,
        language : string,
        compiler : string,
        wasm : string,
    },
    contract : {
        name : string,
        version : string,
        authors : string[],
    },
    [other : string] : any,
}
