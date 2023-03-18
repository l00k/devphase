import { ContractMetadata } from '@/typings';
import { Exception } from '@/utils/Exception';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import * as TsMorph from 'ts-morph';


type InternalTypeDef = {
    kind : string,
    meta : ContractMetadata.TypeDefType,
};

export type BuiltType = {
    native : string,
    codec : string,
}


export class StructTypeBuilder
{
    
    protected _definedTypes : Record<number, InternalTypeDef>;
    
    protected _builtTypes : Record<number, BuiltType> = {};
    protected _typeStatements : Record<string, TsMorph.KindedStructure<any>> = {};
    
    protected _newTypeIdx : number = 0;
    
    
    public constructor (types : ContractMetadata.TypeDef[])
    {
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
    
    public build() : Record<number, BuiltType>
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
    
    public getTypeStatements () : TsMorph.KindedStructure<any>[]
    {
        return Object.values(this._typeStatements);
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
    
    
    public buildType (typeIdx : number)
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
                'Unknown type',
                1667223448403
            );
        }
    }
    
    public buildArray (typeDef : ContractMetadata.Type.ArrayType) : BuiltType
    {
        const { array: { len, type } } = typeDef.def;
        const { native, codec } = this.buildType(type);
        
        return {
            native: `DPT.FixedArray<${native}, ${len}>`,
            codec: `DPT.IVec<${codec}>`,
        };
    }
    
    public buildSequence (typeDef : ContractMetadata.Type.Sequence) : BuiltType
    {
        const { sequence: { type } } = typeDef.def;
        const { native, codec } = this.buildType(type);
        
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
            path
        } = typeDef;
        
        const compositeName = path
            ? this.getTypeNameFromPath(path)
            : 'Composite' + (++this._newTypeIdx)
        ;
        
        let declaration : TsMorph.TypeAliasDeclarationStructure;
        
        const isSimpleObject = fields.find(field => !field.name) === undefined;
        if (isSimpleObject) {
            const strFields = fields
                .map(field => {
                    const { native } = this.buildType(field.type);
                    return field.name + ': ' + native;
                })
                .join(', ');
            
            declaration = {
                kind: TsMorph.StructureKind.TypeAlias,
                name: compositeName,
                type: '{ ' + strFields + ' }',
            };
        }
        else {
            declaration = {
                kind: TsMorph.StructureKind.TypeAlias,
                name: compositeName,
                type: 'any',
            };
        }
        
        this._typeStatements[compositeName] = declaration;
        
        return {
            native: compositeName,
            codec: `DPT.IJson<${compositeName}>`,
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
        
        const variantName = path
            ? this.getTypeNameFromPath(path)
            : 'Variant' + (++this._newTypeIdx)
        ;
        
        // collect variants
        const builtVariants : string[] = [];
        
        if (variants) {
            for (const variant of variants) {
                const { name, fields } = variant;
                
                let innerType;
                if (!fields?.length) {
                    innerType = 'null';
                }
                else if (fields.length === 1) {
                    const { native } = this.buildType(fields[0].type);
                    innerType = native;
                }
                else {
                    const tupleParts = fields
                        .map(field => {
                            const { native } = this.buildType(fields[0].type);
                            return native;
                        })
                        .join(', ');
                    
                    innerType = '[' + tupleParts + ']';
                }
                
                builtVariants.push(
                    `{ ${name}: ${innerType} }`
                );
            }
        }
        else {
            builtVariants.push('{}');
        }
        
        let declaration : TsMorph.TypeAliasDeclarationStructure = {
            kind: TsMorph.StructureKind.TypeAlias,
            name: variantName,
            type: builtVariants.join(' | '),
        };
        this._typeStatements[variantName] = declaration;
        
        return {
            native: variantName,
            codec: `DPT.IJson<${variantName}>`,
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
    
    public getTypeNameFromPath (path : string[]) : string
    {
        return path
            .map(part => upperFirst(camelCase(part)))
            .join('_')
            ;
    }
    
}
