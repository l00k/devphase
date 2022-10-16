import { MochaOptions } from 'mocha';

export type Config = {
    mocha?: MochaOptions
}

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
