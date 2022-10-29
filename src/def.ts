import { MochaOptions } from 'mocha';

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

export type BinarySpawnOptions = {
    args : Record<string, any>,
    envs : NodeJS.ProcessEnv,
    timeout : number
};

export type Config = {
    directories : {
        contracts : string,
        tests : string,
        typings : string,
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



export namespace ContractMetadata
{
    export type TypeRef = {
        displayName : string[],
        type : number,
    };
    
    export type Argument = {
        label : string,
        type : TypeRef,
        docs : string[],
    };
    
    export type IndexedArgument = Argument & {
        indexed : boolean,
    };
    
    export type Constructor = {
        label : string,
        args : Argument[],
        selector : string,
        payable : boolean,
        docs : string[],
    };
    
    export type Message = {
        label : string,
        args : Argument[],
        selector : string,
        payable : boolean,
        mutates : boolean,
        returnType : TypeRef,
        docs : string[],
    };
    
    export type Spec = {
        constructors : Constructor[],
        events : IndexedArgument[],
        messages : Message[],
        docs : string[],
    };
    
    export type Storage = {
        struct : {
            fields : Array<{
                name : string,
                layout : {
                    cell : {
                        key : string,
                        ty : number,
                    }
                }
            }>
        }
    };
    
    export namespace Type
    {
        export type Primitive = {
            def : {
                primitive : string,
            }
        };
        
        export type Composite = {
            def : {
                composite : {
                    fields : Array<{
                        type : number,
                        typeName : string,
                    }>
                }
            },
            path : string[],
        };
        
        export type ArrayType = {
            def : {
                array : {
                    len : string,
                    type : number,
                }
            },
        };
    }
    
    export type TypeDefType = Type.Primitive | Type.Composite | Type.ArrayType;
    
    export type TypeDef = {
        id : number,
        type : TypeDefType,
    };
    
    export type ABI = {
        spec : Spec,
        storage : Storage,
        types : TypeDef[],
    };
    
    export type Metadata = {
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
        V3 : ABI,
    }
    
}

