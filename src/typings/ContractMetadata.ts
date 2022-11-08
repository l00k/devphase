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
        
        export type Variant = {
            def : {
                variant : {
                    variants : Array<{
                        fields : Array<TypeRef>,
                        index : number,
                        name : string,
                    }>
                },
            },
            params : {
                name : string,
                type : number,
            }[],
            path : string[],
        };
        
        export type Composite = {
            def : {
                composite : {
                    fields : Array<{
                        name? : string,
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
        
        export type Sequence = {
            def : {
                sequence : {
                    type : number,
                }
            },
        };
        
        export type Tuple = {
            def : {
                tuple : Array<number>,
            }
        }
    }
    
    export type TypeDefType = Type.Primitive
        | Type.Variant
        | Type.Composite
        | Type.ArrayType
        | Type.Sequence
        | Type.Tuple;
    
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

