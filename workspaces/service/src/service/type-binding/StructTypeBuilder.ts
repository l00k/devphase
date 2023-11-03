import { ContractMetadata } from '@/typings';
import { Exception } from '@/utils/Exception';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import uniq from 'lodash/uniq';
import * as TsMorph from 'ts-morph';
import { StructureKind } from 'ts-morph';


type InternalTypeDef = {
    kind : string,
    meta : ContractMetadata.TypeDefType,
};

export type BuiltType = {
    native : string,
    human : string,
    codec : string,
    refName? : string,
}

export type BuiltInType = BuiltType & {
    params? : number,
}

export type TypeStatement<T extends TsMorph.KindedStructure<any> = any> = {
    declaration : T,
    path : string[],
    refs : string[],
}

enum TypeStatementType
{
    Native = 'Native',
    Human = 'Human',
    Codec = 'Codec',
    Enum = 'Enum' // special type for variants
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
    
    protected _builtInTypes : Record<string, BuiltInType> = {
        '^Result$': { native: 'DPT.Result', human: 'DPT.Result$.Human', codec: 'DPT.Result\$.Codec', params: 2 },
        '^Option$': { native: 'DPT.Option', human: 'DPT.Option$.Human', codec: 'DPT.Option\$.Codec', params: 1 },
        '^([A-Za-z0-9]+)$': { native: 'any', human: 'any', codec: 'PT.$1' },
        '^PrimitiveTypes\.(.*?)$': { native: 'string | number[]', human: 'string', codec: 'PTI.$1' },
        '^InkPrimitives\.Types\.(.*?)$': { native: 'string | number[]', human: 'string', codec: 'PTI.$1' },
        
        // non handled
        '^InkStorage.Lazy.Lazy$': {
            native: 'DPT.InkStorage.Lazy.Lazy',
            human: 'DPT.InkStorage.Lazy.Lazy',
            codec: 'DPT.InkStorage.Lazy.Lazy',
            params: 2,
        },
        '^InkStorage\..*$': { native: 'any', human: 'any', codec: 'any' },
        '^InkStorageTraits\..*$': { native: 'any', human: 'any', codec: 'any' },
    };
    
    protected _usedBuiltInTypes : Set<string> = new Set();
    
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
                this._buildType(Number(idx));
            }
        }
        
        return this._builtTypes;
    }
    
    
    public getBuiltType (typeIdx : number) : BuiltType
    {
        if (!this._builtTypes[typeIdx]) {
            throw new Exception(
                'Unknown type',
                1690148900922
            );
        }
        
        return this._builtTypes[typeIdx];
    }
    
    public getNativeType (typeIdx : number) : string
    {
        const builtType = this.getBuiltType(typeIdx);
        return builtType.native;
    }
    
    public getHumanType (typeIdx : number) : string
    {
        const builtType = this.getBuiltType(typeIdx);
        return builtType.human;
    }
    
    public getCodecType (typeIdx : number) : string
    {
        const builtType = this.getBuiltType(typeIdx);
        return builtType.codec;
    }
    
    public getFlexibleType (typeIdx : number) : string
    {
        const builtType = this.getBuiltType(typeIdx);
        return `${builtType.native} | ${builtType.codec}`;
    }
    
    
    public getExportedTypeStructures () : TsMorph.KindedStructure<any>[]
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
            
            const parentRef = this._getTypeNameFromPath(parentNamespaceNodes);
            const name = namespace[namespace.length - 1];
            const nsReference = this._getTypeNameFromPath(namespace);
            
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
            .sort(([ , a ], [ , b ]) => a.path.length < b.path.length ? -1 : 1)
            .sort(([ aName, a ], [ bName, b ]) => b.refs[aName] ? -1 : 0)
        ;
        
        for (const [ key, node ] of entries) {
            const path = [ ...node.path ];
            
            const name = path.pop();
            const nsParts = path;
            
            if (nsParts.length >= 1) {
                buildNamespaceTree(nsParts);
            }
            
            const nsReference = this._getTypeNameFromPath(nsParts);
            
            const namespace = namespaces[nsReference];
            namespace.push(node.declaration);
        }
        
        return <any>root;
    }
    
    
    public getArgsString (args : ContractMetadata.Argument[]) : string
    {
        if (args.length === 0) {
            return 'never[]';
        }
        else {
            const argTypes : string[] = args.map(arg => this.getFlexibleType(arg.type.type));
            return '[' + argTypes.join(', ') + ']';
        }
    }
    
    
    protected _buildType (typeIdx : number) : BuiltType
    {
        const typeDef = this._definedTypes[typeIdx];
        
        if (this._builtTypes[typeIdx]) {
            return this._builtTypes[typeIdx];
        }
        
        // builtin types
        if (typeDef.kind === 'primitive') {
            this._builtTypes[typeIdx] = this._buildPrimitive(<any>typeDef.meta);
        }
        else if (typeDef.kind === 'array') {
            this._builtTypes[typeIdx] = this._buildArray(<any>typeDef.meta);
        }
        else if (typeDef.kind === 'sequence') {
            this._builtTypes[typeIdx] = this._buildSequence(<any>typeDef.meta);
        }
        else if (typeDef.kind === 'tuple') {
            this._builtTypes[typeIdx] = this._buildTuple(<any>typeDef.meta);
        }
        else if (typeDef.kind === 'composite') {
            this._builtTypes[typeIdx] = this._buildComposite(<any>typeDef.meta);
        }
        else if (typeDef.kind === 'variant') {
            this._builtTypes[typeIdx] = this._buildVariant(<any>typeDef.meta);
        }
        else {
            throw new Exception(
                `Unknown type ${typeDef.kind}@${typeIdx}`,
                1667305662214
            );
        }
        
        return this._builtTypes[typeIdx];
    }
    
    
    protected _buildPrimitive (typeDef : ContractMetadata.Type.Primitive) : BuiltType
    {
        const { primitive } = typeDef.def;
        
        if (primitive === 'bool') {
            return {
                native: 'boolean',
                human: 'boolean',
                codec: 'PT.Bool'
            };
        }
        else if (
            [
                'f32', 'f64', // non used
                'u8', 'u16', 'u32', 'u64', 'u128', 'u256',
                'i8', 'i16', 'i32', 'i64', 'i128', 'i256',
                'usize',
            ].includes(primitive)
        ) {
            const codec = primitive === 'usize'
                ? 'USize'
                : primitive.toUpperCase()
            ;
            return {
                native: 'number',
                human: 'number',
                codec: `PT.${codec}`
            };
        }
        else if ([ 'str' ].includes(primitive)) {
            return {
                native: 'string',
                human: 'string',
                codec: 'PT.Text'
            };
        }
        else {
            throw new Exception(
                'Unknown type. Please submit ticket for this issue.',
                1667223448403
            );
        }
    }
    
    protected _buildArray (typeDef : ContractMetadata.Type.ArrayType) : BuiltType
    {
        const { array: { len, type } } = typeDef.def;
        const { native, codec } = this._buildType(type);
        
        return {
            native: `${native}[]`,
            human: `${native}[]`,
            codec: `PT.VecFixed<${codec}>`,
        };
    }
    
    protected _buildSequence (typeDef : ContractMetadata.Type.Sequence) : BuiltType
    {
        const { sequence: { type } } = typeDef.def;
        const { native, codec } = this._buildType(type);
        
        // special case of Vec<Number>
        if (native === 'number') {
            return {
                native: `${native}[] | string`,
                human: `${native}[] | string`,
                codec: `PT.Vec<${codec}>`,
            };
        }
        
        return {
            native: `${native}[]`,
            human: `${native}[]`,
            codec: `PT.Vec<${codec}>`,
        };
    }
    
    protected _buildTuple (typeDef : ContractMetadata.Type.Tuple) : BuiltType
    {
        const name = 'Tuple' + (++this._newTypeIdx);
        
        const types = typeDef.def.tuple.map(type => this._buildType(type));
        const nativeTypes = types.map(type => type.native);
        const humanTypes = types.map(type => type.human);
        const codecTypes = types.map(type => type.codec);
        
        return {
            native: nativeTypes.length ? `[${nativeTypes.join(', ')}]` : 'never[]',
            human: humanTypes.length ? `[${humanTypes.join(', ')}]` : 'never[]',
            codec: `PTT.ITuple<[${codecTypes.join(', ')}]>`,
        };
    }
    
    
    protected _buildComposite (typeDef : ContractMetadata.Type.Composite) : BuiltType
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
        
        // define name
        const name = path
            ? path[path.length - 1]
            : 'Composite' + (++this._newTypeIdx)
        ;
        const refName = path
            ? this._getTypeNameFromPath(path)
            : name
        ;
        
        // built inner types
        if (fields?.length > 0) {
            fields.forEach(field => {
                this._buildType(field.type);
            });
        }
        
        if (params?.length > 0) {
            params.forEach(param => {
                this._buildType(param.type);
            });
        }
        
        // detect built in types
        const builtInType = this._detectBuiltInType(refName);
        if (builtInType) {
            // collect type parameters
            const typeParameters : BuiltType[][] = [];
            if (params?.length > 0) {
                for (const param of params) {
                    typeParameters.push([
                        this._buildType(param.type)
                    ]);
                }
            }
            
            // prepare usage name with parameters
            const typeParametersUsage = this._buildTypeParametersUsage(
                typeParameters
                    .slice(0, builtInType.params ?? 0)
            );
            
            return {
                native: `${builtInType.native}${typeParametersUsage.native}`,
                human: `${builtInType.human}${typeParametersUsage.human}`,
                codec: `${builtInType.codec}${typeParametersUsage.codec}`,
            };
        }
        
        // simple object case (all fields are named)
        const isSimpleObject = fields && fields.find(field => !field.name) === undefined;
        const isParametrizedObject = params && params.length > 0;
        
        if (isParametrizedObject) {
            throw new Exception(
                `Type parameters not implemented yet. Type ${refName}`,
                1690242994589
            );
        }
        
        if (isSimpleObject) {
            const native = this._buildCompositeTypeStatement(
                path,
                fields,
                TypeStatementType.Native
            );
            const human = this._buildCompositeTypeStatement(
                path,
                fields,
                TypeStatementType.Human
            );
            const codec = this._buildCompositeTypeStatement(
                path,
                fields,
                TypeStatementType.Codec
            );
            
            return {
                native,
                human,
                codec,
                refName: native
            };
        }
        
        throw new Exception(
            `Unable to handle type ${refName}. Please submit ticket for this issue.`,
            1690242871378
        );
    }
    
    protected _buildCompositeTypeStatement (
        path : string[],
        fields : ContractMetadata.Type.CompositeField[],
        typeStatementType : TypeStatementType
    ) : string
    {
        // define name
        const name = path
            ? path[path.length - 1]
            : 'Composite' + (++this._newTypeIdx)
        ;
        const refName = path
            ? this._getTypeNameFromPath(path)
            : name
        ;
        
        const structureName = typeStatementType == TypeStatementType.Native
            ? name
            : typeStatementType.toString()
        ;
        
        const typeStatementPath = typeStatementType == TypeStatementType.Native
            ? this._getPreparedPath(path)
            : this._getPreparedPath([
                ...path.slice(0, -1),
                `${name}$`,
                structureName
            ])
        ;
        
        const fullRefName = refName + (
                typeStatementType != TypeStatementType.Native
                    ? `$.${typeStatementType.toString()}`
                    : ''
            )
        ;
        
        // find refs
        const directRefs : string[] = [];
        if (fields.length > 0) {
            fields.forEach(field => {
                const { refName } = this._buildType(field.type);
                if (refName) {
                    directRefs.push(refName);
                }
            });
        }
        
        const refs = directRefs.reduce((acc, c) => [
            ...acc,
            ...this._typeStatements[c].refs,
            c,
        ], []);
        
        // create declaration
        const declaration : TsMorph.InterfaceDeclarationStructure = {
            isExported: true,
            kind: TsMorph.StructureKind.Interface,
            name: structureName,
            properties: fields.map(field => {
                const builtType = this.getBuiltType(field.type);
                return {
                    kind: TsMorph.StructureKind.PropertySignature,
                    name: camelCase(field.name),
                    type: builtType[typeStatementType.toString().toLowerCase()],
                };
            }),
        };
        
        if (typeStatementType == TypeStatementType.Codec) {
            declaration.extends = [ `DPT.Json<${refName}, ${refName}$.Human>` ];
        }
        
        this._typeStatements[fullRefName] = {
            declaration,
            path: typeStatementPath,
            refs,
        };
        
        return fullRefName;
    };
    
    
    protected _buildVariant (typeDef : ContractMetadata.Type.Variant) : BuiltType
    {
        const {
            def: {
                variant: { variants }
            },
            params,
            path
        } = typeDef;
        
        // built type name
        const name = path
            ? path[path.length - 1]
            : 'Variant' + (++this._newTypeIdx)
        ;
        const refName = path
            ? this._getTypeNameFromPath(path)
            : name
        ;
        
        // build inner types
        if (variants?.length > 0) {
            variants.forEach(variant => {
                if (variant?.fields?.length > 0) {
                    variant?.fields?.forEach(field => {
                        this._buildType(field.type);
                    });
                }
            });
        }
        
        // detect built in type
        const builtInType = this._detectBuiltInType(refName);
        if (builtInType) {
            // collect type parameters
            const typeParameters : Record<string, BuiltType[]> = {};
            if (variants?.length > 0) {
                for (const variant of variants) {
                    const { name, fields } = variant;
                    if (fields?.length > 0) {
                        typeParameters[name] = fields
                            .map(field => this._buildType(field.type))
                        ;
                    }
                }
            }
            
            // prepare usage name with parameters
            const typeParametersUsage = this._buildTypeParametersUsage(
                Object.values(typeParameters)
            );
            
            return {
                native: `${builtInType.native}${typeParametersUsage.native}`,
                human: `${builtInType.human}${typeParametersUsage.human}`,
                codec: `${builtInType.codec}${typeParametersUsage.codec}`,
            };
        }
        
        // create variant structures
        const native = this._buildVaraiantTypeStatement(
            path,
            variants,
            TypeStatementType.Native
        );
        this._buildVaraiantTypeStatement(
            path,
            variants,
            TypeStatementType.Enum
        );
        
        const human = this._buildVaraiantTypeStatement(
            path,
            variants,
            TypeStatementType.Human
        );
        const codec = this._buildVaraiantTypeStatement(
            path,
            variants,
            TypeStatementType.Codec
        );
        
        return {
            native,
            human,
            codec,
            refName: native
        };
    }
    
    protected _buildVaraiantTypeStatement (
        path : string[],
        variants : ContractMetadata.Type.VariantDscr[],
        typeStatementType : TypeStatementType
    ) : string
    {
        // define name
        const name = path
            ? path[path.length - 1]
            : 'Variant' + (++this._newTypeIdx)
        ;
        const refName = path
            ? this._getTypeNameFromPath(path)
            : name
        ;
        
        const structureName = typeStatementType == TypeStatementType.Native
            ? name
            : `${typeStatementType.toString()}`
        ;
        
        const typeStatementPath = typeStatementType == TypeStatementType.Native
            ? this._getPreparedPath(path)
            : this._getPreparedPath([
                ...path.slice(0, -1),
                name + '$',
                structureName
            ])
        ;
        
        const fullRefName = refName + (
                typeStatementType != TypeStatementType.Native
                    ? `$.${typeStatementType.toString()}`
                    : ''
            )
        ;
        
        if (!variants) {
            this._typeStatements[fullRefName] = {
                declaration: <TsMorph.TypeAliasDeclarationStructure>{
                    isExported: true,
                    kind: TsMorph.StructureKind.TypeAlias,
                    name: structureName,
                    type: 'any'
                },
                path: typeStatementPath,
                refs: [],
            };
            
            return fullRefName;
        }
        
        // find refs
        const directRefs : string[] = [];
        if (variants.length > 0) {
            variants.forEach(variant => {
                if (variant?.fields?.length > 0) {
                    variant.fields.forEach(field => {
                        const { refName } = this._builtTypes[field.type];
                        if (refName) {
                            directRefs.push(refName);
                        }
                    });
                }
            });
        }
        
        const refs = directRefs.reduce((acc, c) => [
            ...acc,
            ...this._typeStatements[c].refs,
            c,
        ], []);
        
        // group possible variants
        const possibleVariants : string[] = [];
        const valuedVariants : Record<string, BuiltType[]> = {};
        
        for (const variant of variants) {
            possibleVariants.push(variant.name);
            
            if (variant?.fields?.length > 0) {
                valuedVariants[variant.name] = variant.fields
                    .map(field => this._builtTypes[field.type])
                ;
            }
        }
        
        const typeProp = typeStatementType.toString().toLowerCase();
        let declaration : TsMorph.KindedStructure<any> = null;
        
        if (typeStatementType == TypeStatementType.Enum) {
            declaration = <TsMorph.EnumDeclarationStructure>{
                isExported: true,
                kind: TsMorph.StructureKind.Enum,
                name: structureName,
                members: possibleVariants.map(variantName => {
                    const builtTypes = valuedVariants[variantName];
                    const type = builtTypes === undefined
                        ? 'null'
                        : this._buildTupleOrDirectUsage(builtTypes, typeStatementType)
                    ;
                    
                    return {
                        kind: TsMorph.StructureKind.EnumMember,
                        name: variantName,
                        value: variantName,
                    };
                }),
            };
        }
        else if (typeStatementType == TypeStatementType.Native) {
            declaration = <TsMorph.InterfaceDeclarationStructure>{
                isExported: true,
                kind: TsMorph.StructureKind.Interface,
                name: structureName,
                properties: [
                    ...possibleVariants.map(variantName => {
                        const builtTypes = valuedVariants[variantName];
                        const type = builtTypes === undefined
                            ? 'null'
                            : this._buildTupleOrDirectUsage(builtTypes, typeStatementType)
                        ;
                        
                        return {
                            kind: TsMorph.StructureKind.PropertySignature,
                            name: camelCase(variantName),
                            hasQuestionToken: true,
                            type,
                        };
                    }),
                    {
                        name: '[index: string]',
                        type: 'any'
                    }
                ],
            };
        }
        else if (typeStatementType == TypeStatementType.Human) {
            const typeVariantsAlt = [
                ...possibleVariants
                    .filter(variantName => !valuedVariants[variantName])
                    .map(variantName => `${refName}$.Enum.${variantName} & { [index: string]: any }`),
            ];
            
            if (Object.values(valuedVariants).length > 0) {
                const valuedVariantsStruct = '{\n'
                    + Object.entries(valuedVariants)
                        .map(([ variantName, variantType ]) => {
                            return variantName + '?: ' + this._buildTupleOrDirectUsage(variantType, typeStatementType);
                        })
                        .join(',\n')
                    + '\n}';
                typeVariantsAlt.push(valuedVariantsStruct);
            }
        
            declaration = <TsMorph.TypeAliasDeclarationStructure>{
                isExported: true,
                kind: TsMorph.StructureKind.TypeAlias,
                name: structureName,
                type: typeVariantsAlt.join('\n| ')
            };
        }
        else if (typeStatementType == TypeStatementType.Codec) {
            const codecVariants : string[] = uniq(
                possibleVariants
                    .map(variantName => {
                        const variantValues = valuedVariants[variantName];
                        return this._buildTupleOrDirectUsage(variantValues, TypeStatementType.Codec);
                    })
            );
        
            declaration = <TsMorph.InterfaceDeclarationStructure>{
                isExported: true,
                kind: TsMorph.StructureKind.Interface,
                name: structureName,
                extends: [ 'PT.Enum' ],
                properties: [
                    { name: 'type', type: 'Enum' },
                    { name: 'inner', type: codecVariants.join(' | ') },
                    { name: 'value', type: codecVariants.join(' | ') }
                ],
                methods: [
                    {
                        name: 'toHuman',
                        parameters: [
                            {
                                name: 'isExtended',
                                hasQuestionToken: true,
                                type: 'boolean'
                            }
                        ],
                        returnType: 'Human',
                    },
                    {
                        name: 'toJSON',
                        returnType: name,
                    },
                    {
                        name: 'toPrimitive',
                        returnType: name,
                    },
                ]
            };
        }
        
        this._typeStatements[fullRefName] = {
            declaration,
            path: typeStatementPath,
            refs,
        };
        
        return fullRefName;
    };
    
    
    protected _detectBuiltInType(refName : string) : BuiltInType
    {
        for (const [ pattern, builtInType ] of Object.entries(this._builtInTypes)) {
            const regex = new RegExp(pattern);
            const matches = refName.match(regex);
            if (matches) {
                return {
                    ...builtInType,
                    native: refName.replace(regex, builtInType.native),
                    human: refName.replace(regex, builtInType.human),
                    codec: refName.replace(regex, builtInType.codec),
                }
            }
        }
        
        return null;
    }
    
    protected _buildTupleOrDirectUsage (
        builtTypes : BuiltType[],
        typeStatementType : TypeStatementType
    ) : string
    {
        const typeProp = typeStatementType.toString().toLowerCase();
        
        if (!builtTypes?.length) {
            return typeStatementType == TypeStatementType.Codec
                ? 'PTT.Codec'
                : 'never'
                ;
        }
        else if (builtTypes.length == 1) {
            return builtTypes[0][typeProp];
        }
        else {
            return '[ '
                + builtTypes
                    .map(type => type[typeProp])
                    .join(', ')
                + ' ]';
        }
    }
    
    protected _buildTypeParametersUsage (
        typeParameters : BuiltType[][]
    ) : BuiltType
    {
        function innerBuild (
            typeParameters : BuiltType[][],
            typeStatementType : TypeStatementType
        ) : string
        {
            const prop = typeStatementType.toString().toLowerCase();
            return typeParameters
                .map(typeParameter => {
                    return typeParameter.length > 1
                        ? '[' + typeParameter.map(_tp => _tp[prop]).join(', ') + ']'
                        : typeParameter[0][prop]
                        ;
                })
                .join(',\n')
                ;
        }
        
        let native = innerBuild(typeParameters, TypeStatementType.Native);
        let human = innerBuild(typeParameters, TypeStatementType.Human);
        let codec = innerBuild(typeParameters, TypeStatementType.Codec);
        
        if (typeParameters.length > 0) {
            native = `<\n${native}\n>`;
            human = `<\n${human}\n>`;
            codec = `<\n${codec}\n>`;
        }
        
        return { native, human, codec };
    }
    
    protected _getPreparedPath (path : string[]) : string[]
    {
        const formated = path
            .map(part => {
                const isSuffixed = part[part.length - 1] == '$';
                return upperFirst(camelCase(part)) + (isSuffixed ? '$' : '');
            })
        ;
        
        const dedupe = formated[0] == formated[1]
            && formated.length > 2
            ;
        
        return dedupe
            ? formated.slice(1) // dedupe
            : formated
            ;
    }
    
    protected _getTypeNameFromPath (
        path : string[],
        idx? : number
    ) : string
    {
        const pathName = this._getPreparedPath(path)
            .join('.')
        ;
        return pathName + (idx ? '$' + idx.toString() : '');
    }
    
}
