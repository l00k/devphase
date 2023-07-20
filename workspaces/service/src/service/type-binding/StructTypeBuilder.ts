import { ContractMetadata } from '@/typings';
import { Exception } from '@/utils/Exception';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import * as TsMorph from 'ts-morph';
import { StructureKind } from 'ts-morph';


type InternalTypeDef = {
    kind : string,
    meta : ContractMetadata.TypeDefType,
};

export type BuiltType = {
    native : string,
    codec : string,
    refName? : string,
}

export type TypeStatement = {
    declaration : TsMorph.KindedStructure<any>,
    path : string[],
    refs : string[],
}

export type NamespaceStatement = {
    declarations : TsMorph.KindedStructure<any>[],
    children : NamespaceStatement[],
}

type TypeTree = {
    [node : string] : TypeTree | string
};

export class StructTypeBuilder
{
    
    protected _contractName : string;
    protected _definedTypes : Record<number, InternalTypeDef>;
    
    protected _builtTypes : Record<number, BuiltType> = {};
    protected _typeStatements : Record<string, TypeStatement> = {};
    
    protected _newTypeIdx : number = 0;
    
    
    public constructor (
        types : ContractMetadata.TypeDef[],
        contractName : string,
    )
    {
        this._contractName = contractName;
        this._definedTypes = Object.fromEntries(
            types.map(typeDef => {
                return [
                    typeDef.id,
                    {
                        kind: Object.keys(typeDef.type.def)[0],
                        meta: typeDef.type,
                    }
                ];
            })
        );
    }
    
    public build () : Record<number, BuiltType>
    {
        for (const [ idx, typeDef ] of Object.entries(this._definedTypes)) {
            if (!this._builtTypes[idx]) {
                this.buildType(Number(idx));
            }
        }
        
        return this._builtTypes;
    }
    
    
    public getNativeType (typeIdx : number) : string
    {
        if (!this._builtTypes[typeIdx]) {
            throw new Exception(
                'Unknown type',
                1667305507276
            );
        }
        
        return this._builtTypes[typeIdx].native;
    }
    
    public getCodecType (typeIdx : number) : string
    {
        if (!this._builtTypes[typeIdx]) {
            throw new Exception(
                'Unknown type',
                1667305512350
            );
        }
        
        return this._builtTypes[typeIdx].codec;
    }
    
    public getExportedStructures () : TsMorph.KindedStructure<any>[]
    {
        // build namespaces
        const root : TsMorph.KindedStructure<any>[] = [];
        const namespaces : Record<string, TsMorph.KindedStructure<any>[]> = {
            '': root,
        };
        
        const buildNamespaceTree = (namespace : string[]) => {
            if (namespace.length == 0) {
                return;
            }
            
            const parentNamespaceNodes = namespace.slice(0, -1);
            buildNamespaceTree(parentNamespaceNodes);
            
            const parentRef = this.getTypeNameFromPath(parentNamespaceNodes);
            const name = namespace[namespace.length - 1];
            const nsReference = this.getTypeNameFromPath(namespace);
            
            if (!namespaces[nsReference]) {
                const namespaceStruct : any = {
                    isExported: true,
                    kind: StructureKind.Module,
                    declarationKind: TsMorph.ModuleDeclarationKind.Namespace,
                    name,
                    statements: [],
                };
                
                namespaces[nsReference] = namespaceStruct.statements;
                
                if (parentRef == '') {
                    root.push(namespaceStruct);
                }
                else {
                    namespaces[parentRef].push(namespaceStruct);
                }
            }
        };
        
        const entries = Object.entries(this._typeStatements)
            .sort(([,a], [,b]) => a.path.length < b.path.length ? -1 : 1)
            .sort(([aName,a], [bName,b]) => b.refs[aName] ? -1 : 0)
            ;
        
        for (const [ key, node ] of entries) {
            const path = [ ...node.path ];
        
            const name = path.pop();
            const nsParts = path;
            
            if (nsParts.length >= 1) {
                buildNamespaceTree(nsParts);
            }
            
            const nsReference = this.getTypeNameFromPath(nsParts);
            
            const namespace = namespaces[nsReference];
            namespace.push(node.declaration);
        }
        
        return <any> root;
    }
    
    
    
    public getArgsString (args : ContractMetadata.Argument[]) : string
    {
        if (args.length === 0) {
            return 'never[]';
        }
        else {
            const argTypes : string[] = args.map(arg => this.getNativeType(arg.type.type));
            return '[' + argTypes.join(', ') + ']';
        }
    }
    
    
    public buildType (typeIdx : number) : BuiltType
    {
        const typeDef = this._definedTypes[typeIdx];
        
        if (this._builtTypes[typeIdx]) {
            return this._builtTypes[typeIdx];
        }
        
        if (typeDef.kind === 'primitive') {
            this._builtTypes[typeIdx] = this.buildPrimitive(<any>typeDef.meta);
        }
        else if (typeDef.kind === 'array') {
            this._builtTypes[typeIdx] = this.buildArray(<any>typeDef.meta);
        }
        else if (typeDef.kind === 'sequence') {
            this._builtTypes[typeIdx] = this.buildSequence(<any>typeDef.meta);
        }
        else if (typeDef.kind === 'composite') {
            this._builtTypes[typeIdx] = this.buildComposite(<any>typeDef.meta);
        }
        else if (typeDef.kind === 'variant') {
            this._builtTypes[typeIdx] = this.buildVariant(<any>typeDef.meta);
        }
        else if (typeDef.kind === 'tuple') {
            this._builtTypes[typeIdx] = this.buildTuple(<any>typeDef.meta);
        }
        else {
            throw new Exception(
                `Unknown type ${typeDef.kind}@${typeIdx}`,
                1667305662214
            );
        }
        
        return this._builtTypes[typeIdx];
    }
    
    
    public buildPrimitive (typeDef : ContractMetadata.Type.Primitive) : BuiltType
    {
        const { primitive } = typeDef.def;
        
        if (primitive === 'bool') {
            return {
                native: 'boolean',
                codec: 'DPT.IJson<boolean>'
            };
        }
        else if ([ 'u8', 'u16', 'u32', 'u64', 'u128', 'i8', 'i16', 'i32', 'i64', 'i128' ].includes(primitive)) {
            return {
                native: 'number',
                codec: 'DPT.INumber'
            };
        }
        else if ([ 'str' ].includes(primitive)) {
            return {
                native: 'string',
                codec: 'DPT.IText'
            };
        }
        else {
            // todo ld 2022-10-31 09:00:10
            throw new Exception(
                'Unknown type. Please submit ticket for that issue.',
                1667223448403
            );
        }
    }
    
    public buildArray (typeDef : ContractMetadata.Type.ArrayType) : BuiltType
    {
        const { array: { len, type } } = typeDef.def;
        const { native, codec } = this.buildType(type);
        
        return {
            native: `${native}[]`,
            codec: `DPT.IVec<${codec}>`,
        };
    }
    
    public buildSequence (typeDef : ContractMetadata.Type.Sequence) : BuiltType
    {
        const { sequence: { type } } = typeDef.def;
        const { native, codec } = this.buildType(type);
        
        // special case of Vec<Number>
        if (native === 'number') {
            return {
                native: `${native}[] | string`,
                codec: `DPT.IVec<${codec}>`,
            };
        }
        
        return {
            native: `${native}[]`,
            codec: `DPT.IVec<${codec}>`,
        };
    }
    
    
    public buildComposite (typeDef : ContractMetadata.Type.Composite) : BuiltType
    {
        const {
            def: {
                composite: {
                    fields
                }
            },
            params,
            path
        } = typeDef;
        
        const name = path
            ? path[path.length - 1]
            : 'Composite' + (++this._newTypeIdx)
        ;
        const refName = path
            ? this.getTypeNameFromPath(path)
            : name
        ;
        
        const directRefs : string[] = [];
        
        let declaration : TsMorph.TypeAliasDeclarationStructure;
        
        const isSimpleObject = fields && fields.find(field => !field.name) === undefined;
        const isParameterizedObject = params && params.find(param => !param.name) === undefined;
        if (isSimpleObject) {
            const strFields = fields
                .map(field => {
                    const { native, refName } = this.buildType(field.type);
                    
                    if (refName) {
                        directRefs.push(refName);
                    }
                    
                    return field.name + ': ' + native;
                })
                .join(',\n');
            
            declaration = {
                isExported: true,
                kind: TsMorph.StructureKind.TypeAlias,
                name,
                type: '{\n' + strFields + '\n}',
            };
        }
        else if (isParameterizedObject) {
            // todo ld 2023-07-19 16:57:07 - no implementation yet
            declaration = {
                isExported: true,
                kind: TsMorph.StructureKind.TypeAlias,
                name,
                type: 'any',
            };
        }
        else {
            declaration = {
                isExported: true,
                kind: TsMorph.StructureKind.TypeAlias,
                name,
                type: 'any',
            };
        }
        
        const refs = directRefs.reduce((acc, c) => [
            ...acc,
            ...this._typeStatements[c].refs,
            c,
        ], []);
        
        this._typeStatements[refName] = {
            declaration,
            path: this.getPreparedPath(path),
            refs,
        };
        
        return {
            native: refName,
            codec: `DPT.IJson<${refName}>`,
            refName
        };
    }
    
    public buildVariant (typeDef : ContractMetadata.Type.Variant) : BuiltType
    {
        const {
            def: {
                variant: { variants }
            },
            params,
            path
        } = typeDef;
        
        const name = path
            ? path[path.length - 1]
            : 'Variant' + (++this._newTypeIdx)
        ;
        const refName = path
            ? this.getTypeNameFromPath(path)
            : name
        ;
        
        const directRefs : string[] = [];
        
        // collect variants
        const builtVariants : Record<string, string> = {};
        
        const typeParameters : string[] = [];
        const typeParamValues : string[] = [];
        
        if (variants) {
            for (const variant of variants) {
                const { name, fields } = variant;
                
                if (!fields?.length) {
                    builtVariants[name] = null;
                }
                else if (fields.length === 1) {
                    const { native, refName } = this.buildType(fields[0].type);
                    
                    if (refName) {
                        directRefs.push(refName);
                    }
                    
                    typeParameters.push(name);
                    typeParamValues.push(native);
                    
                    builtVariants[name] = name;
                }
                else {
                    const tupleParts = fields
                        .map(field => {
                            const { native, refName } = this.buildType(fields[0].type);
                    
                            if (refName) {
                                directRefs.push(refName);
                            }
                            
                            return native;
                        })
                        .join(', ');
                    
                    builtVariants[name] = '[' + tupleParts + ']';
                }
            }
        }
        
        const declarationInnerType = Object.entries(builtVariants)
            .map(([ name, propType ]) => `${name}? : ${propType}`)
            .join(',\n')
        ;
        
        const declaration : TsMorph.TypeAliasDeclarationStructure = {
            isExported: true,
            kind: TsMorph.StructureKind.TypeAlias,
            name,
            typeParameters,
            type: '{\n' + declarationInnerType + '\n}',
        };
        
        const refs = directRefs.reduce((acc, c) => [
            ...acc,
            ...this._typeStatements[c].refs,
            c,
        ], []);
        
        this._typeStatements[refName] = {
            declaration,
            path: this.getPreparedPath(path),
            refs,
        };
        
        let parameterizedName = refName;
        if (typeParameters.length) {
            parameterizedName += `<${typeParamValues.join(', ')}>`;
        }
        
        return {
            native: parameterizedName,
            codec: `DPT.IJson<${parameterizedName}>`,
            refName
        };
    }
    
    public buildTuple (typeDef : ContractMetadata.Type.Tuple) : BuiltType
    {
        const name = 'Tuple' + (++this._newTypeIdx);
        
        const types = typeDef.def.tuple.map(type => this.buildType(type));
        const nativeTypes = types
            .map(type => type.native)
            .join(', ')
        ;
        const codecTypes = types
            .map(type => type.codec)
            .join(', ')
        ;
        
        return {
            native: nativeTypes ? `[ ${nativeTypes} ]` : 'never[]',
            codec: `DPT.ITuple<[ ${codecTypes} ]>`,
        };
    }
    
    
    public getPreparedPath (path : string[]) : string[]
    {
        const formated = path
            .map(part => upperFirst(camelCase(part)))
        ;
    
        return formated[0] == this._contractName && formated[1] == this._contractName
            ? formated.slice(1) // dedupe
            : formated
            ;
    }
    
    public getTypeNameFromPath (
        path : string[],
        idx? : number
    ) : string
    {
        const pathName = this.getPreparedPath(path)
            .join('.')
        ;
        return pathName + (idx ? '$' + idx.toString() : '');
    }
    
}
