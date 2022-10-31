import { ContractMetadata } from '@/def';
import { Exception } from '@/utils/Exception';
import upperFirst from 'lodash/upperFirst';
import path from 'path';
import * as TsMorph from 'ts-morph';


type Type = {
    kind : string,
    meta : ContractMetadata.TypeDefType,
};

export class AbiTypeBindingProcessor
{
    
    protected _types : Record<number, Type>;
    
    
    public constructor (
        protected readonly _abi : ContractMetadata.ABI
    )
    {
        this._buildInternalTypes();
    }
    
    protected _buildInternalTypes ()
    {
        this._types = Object.fromEntries(
            this._abi.types.map(typeDef => {
                return [
                    typeDef.id,
                    {
                        kind: Object.keys(typeDef.type.def)[0],
                        meta: typeDef.type,
                    }
                ];
            })
        );
        
        
        console.dir(this._types, { depth: 10 });
    }
    
    public static async createTypeBindingFile (
        filePath : string,
        contractName : string,
        abi : ContractMetadata.ABI
    ) : Promise<void>
    {
        const projectPath = path.basename(filePath);
        const project = new TsMorph.Project({
            compilerOptions: {
                rootDir: projectPath,
            }
        });
        
        const file = project.createSourceFile(
            filePath,
            undefined,
            { overwrite: true }
        );
        
        // create context
        const context = new AbiTypeBindingProcessor(abi);
        
        // imports
        file.addStatements(context.getImportStatements());
        
        // main module
        file.addModule({
            isExported: true,
            name: contractName,
            statements: [
                ...context.buildMapMessageQueryInterface(),
                ...context.buildMapMessageTxInterface(),
                ...context.buildContractClass(),
                ...context.buildFactoryClass(),
            ]
        });
        
        file.saveSync();
    }
    
    public getImportStatements () : TsMorph.ImportDeclarationStructure[]
    {
        return [
            {
                kind: TsMorph.StructureKind.ImportDeclaration,
                isTypeOnly: true,
                namespaceImport: 'PhalaSdk',
                moduleSpecifier: '@phala/sdk',
            },
            {
                kind: TsMorph.StructureKind.ImportDeclaration,
                isTypeOnly: true,
                namespaceImport: 'DevPhase',
                moduleSpecifier: 'devphase',
            },
            {
                kind: TsMorph.StructureKind.ImportDeclaration,
                isTypeOnly: true,
                namespaceImport: 'DPT',
                moduleSpecifier: 'devphase/etc/typings',
            },
            {
                kind: TsMorph.StructureKind.ImportDeclaration,
                isTypeOnly: true,
                namedImports: [ 'ContractCallResult', 'ContractQuery' ],
                moduleSpecifier: '@polkadot/api-contract/base/types',
            },
            {
                kind: TsMorph.StructureKind.ImportDeclaration,
                isTypeOnly: true,
                namedImports: [ 'ContractCallOutcome', 'ContractOptions' ],
                moduleSpecifier: '@polkadot/api-contract/types',
            },
            {
                kind: TsMorph.StructureKind.ImportDeclaration,
                isTypeOnly: true,
                namedImports: [ 'Codec' ],
                moduleSpecifier: '@polkadot/types/types',
            },
        ];
    }
    
    public buildMapMessageQueryInterface () : TsMorph.KindedStructure<any>[]
    {
        const queriesModuleInterfaces : TsMorph.InterfaceDeclarationStructure[] = [];
        
        const queryMessages = this._abi.spec.messages
            .filter(message => message.mutates === false);
        for (const queryMessage of queryMessages) {
            const name = upperFirst(queryMessage.label);
            const returnType = this.buildCodecType(queryMessage.returnType);
            
            queriesModuleInterfaces.push({
                isExported: true,
                kind: TsMorph.StructureKind.Interface,
                name,
                extends: [ 'DPT.ContractQuery' ],
                callSignatures: [
                    {
                        kind: TsMorph.StructureKind.CallSignature,
                        parameters: [
                            {
                                kind: TsMorph.StructureKind.Parameter,
                                name: 'certificateData',
                                type: 'PhalaSdk.CertificateData'
                            },
                            {
                                kind: TsMorph.StructureKind.Parameter,
                                name: 'options',
                                type: 'ContractOptions'
                            },
                            ...queryMessage.args.map<TsMorph.ParameterDeclarationStructure>(arg => ({
                                kind: TsMorph.StructureKind.Parameter,
                                name: arg.label,
                                type: this.buildNativeType(arg.type),
                            })),
                        ],
                        returnType: `DPT.CallResult<DPT.CallOutcome<${returnType}>>`,
                    }
                ]
            });
        }
        
        return [
            <TsMorph.ModuleDeclarationStructure>{
                docs: [ '', 'Queries', '' ],
                kind: TsMorph.StructureKind.Module,
                name: 'ContractQuery',
                statements: queriesModuleInterfaces,
            },
            <TsMorph.InterfaceDeclarationStructure>{
                isExported: true,
                kind: TsMorph.StructureKind.Interface,
                name: 'MapMessageQuery',
                extends: [ 'DPT.MapMessageQuery' ],
                properties: this._abi.spec.messages
                    .filter(message => message.mutates === false)
                    .map(message => ({
                        kind: TsMorph.StructureKind.PropertySignature,
                        name: message.label,
                        type: 'ContractQuery.' + upperFirst(message.label),
                    }))
            }
        ];
    }
    
    public buildMapMessageTxInterface () : TsMorph.KindedStructure<any>[]
    {
        const txsModuleInterfaces : TsMorph.InterfaceDeclarationStructure[] = [];
        
        const txMessages = this._abi.spec.messages
            .filter(message => message.mutates === true);
        for (const txMessage of txMessages) {
            const name = upperFirst(txMessage.label);
            
            txsModuleInterfaces.push({
                isExported: true,
                kind: TsMorph.StructureKind.Interface,
                name,
                extends: [ 'DPT.ContractTx' ],
                callSignatures: [
                    {
                        kind: TsMorph.StructureKind.CallSignature,
                        parameters: [
                            {
                                kind: TsMorph.StructureKind.Parameter,
                                name: 'options',
                                type: 'ContractOptions'
                            },
                            ...txMessage.args.map<TsMorph.ParameterDeclarationStructure>(arg => ({
                                kind: TsMorph.StructureKind.Parameter,
                                name: arg.label,
                                type: this.buildNativeType(arg.type),
                            })),
                        ],
                        returnType: `DPT.SubmittableExtrinsic`,
                    }
                ]
            });
        }
        
        return [
            <TsMorph.ModuleDeclarationStructure>{
                docs: [ '', 'Transactions', '' ],
                kind: TsMorph.StructureKind.Module,
                name: 'ContractTx',
                statements: txsModuleInterfaces,
            },
            <TsMorph.InterfaceDeclarationStructure>{
                isExported: true,
                kind: TsMorph.StructureKind.Interface,
                name: 'MapMessageTx',
                extends: [ 'DPT.MapMessageTx' ],
                properties: this._abi.spec.messages
                    .filter(message => message.mutates === true)
                    .map(message => ({
                        kind: TsMorph.StructureKind.PropertySignature,
                        name: message.label,
                        type: 'ContractTx.' + upperFirst(message.label),
                    }))
            }
        ];
    }
    
    public buildContractClass () : TsMorph.ClassDeclarationStructure[]
    {
        return [
            {
                docs: [ '', 'Contract', '' ],
                isExported: true,
                hasDeclareKeyword: true,
                kind: TsMorph.StructureKind.Class,
                name: 'Contract',
                extends: 'DPT.Contract',
                getAccessors: [
                    {
                        name: 'query',
                        returnType: 'MapMessageQuery'
                    },
                    {
                        name: 'tx',
                        returnType: 'MapMessageTx'
                    },
                ]
            }
        ];
    }
    
    public buildFactoryClass () : TsMorph.ClassDeclarationStructure[]
    {
        return [
            {
                docs: [ '', 'Contract factory', '' ],
                isExported: true,
                hasDeclareKeyword: true,
                kind: TsMorph.StructureKind.Class,
                name: 'Factory',
                extends: 'DevPhase.ContractFactory',
                methods: this._abi.spec.constructors.map(constructor => ({
                    name: 'instantiate',
                    typeParameters: [
                        {
                            name: 'T',
                            default: 'Contract',
                        }
                    ],
                    parameters: [
                        {
                            name: 'constructor',
                            type: `"${constructor.label}"`,
                        },
                        {
                            name: 'params',
                            type: this.buildArgsString(constructor.args),
                        },
                        {
                            name: 'options',
                            hasQuestionToken: true,
                            type: 'DevPhase.InstantiateOptions'
                        },
                    ],
                    returnType: 'Promise<T>'
                })),
            }
        ];
    }
    
    
    public buildArgsString (args : ContractMetadata.Argument[]) : string
    {
        if (args.length === 0) {
            return 'never[]';
        }
        else {
            const argTypes : string[] = args.map(arg => this.buildNativeType(arg.type));
            return '[' + argTypes.join(', ') + ']';
        }
    }
    
    public buildNativeType (typeRef : Partial<ContractMetadata.TypeRef>) : string
    {
        const typeDef = this._types[typeRef.type];
        
        if (typeDef.kind === 'primitive') {
            const primitive = (<ContractMetadata.Type.Primitive>typeDef.meta).def.primitive;
            
            if (primitive === 'bool') {
                return 'boolean';
            }
            else if ([ 'u8', 'u16', 'u32', 'u64', 'u128', 'i8', 'i16', 'i32', 'i64', 'i128' ].includes(primitive)) {
                return 'number';
            }
            else if ([ 'str' ].includes(primitive)) {
                return 'string';
            }
            else {
                // todo ld 2022-10-31 09:00:10
                console.log(typeDef);
                
                throw new Exception(
                    'Unknown type',
                    1667223448403
                );
            }
        }
        else if (typeDef.kind === 'variant') {
            // todo ld 2022-10-31 09:00:02
            return 'any';
        }
        else if (typeDef.kind === 'composite') {
            const composite = (<ContractMetadata.Type.Composite>typeDef.meta).def.composite;
            
            const fields = composite.fields
                .map(field => field.name + ': ' + this.buildNativeType({ type: field.type }))
                .join(', ');
            
            return '{ ' + fields + ' }';
        }
        else if (typeDef.kind === 'array') {
            const { type, len } = (<ContractMetadata.Type.ArrayType>typeDef.meta).def.array;
            
            const innerType = this.buildNativeType({ type });
            return `DPT.FixedArray<${innerType}, ${len}>`;
        }
        else if (typeDef.kind === 'sequence') {
            const { type } = (<ContractMetadata.Type.Sequence>typeDef.meta).def.sequence;
            
            const innerType = this.buildNativeType({ type });
            return `${innerType}[]`;
        }
        else {
            throw new Exception(
                'Unknown type',
                1667028692024
            );
        }
    }
    
    public buildCodecType (typeRef : Partial<ContractMetadata.TypeRef>) : string
    {
        const typeDef = this._types[typeRef.type];
        
        if (typeDef.kind === 'primitive') {
            const primitive = (<ContractMetadata.Type.Primitive>typeDef.meta).def.primitive;
            
            if (primitive === 'bool') {
                return 'DPT.IBool';
            }
            else if ([ 'u8', 'u16', 'u32', 'u64', 'u128', 'i8', 'i16', 'i32', 'i64', 'i128' ].includes(primitive)) {
                return 'DPT.INumber';
            }
            else if ([ 'str' ].includes(primitive)) {
                return 'DPT.IText';
            }
            else {
                // todo ld 2022-10-31 09:00:10
                return 'any';
            }
        }
        else if (typeDef.kind === 'variant') {
            // todo ld 2022-10-31 09:00:10
            const params = (<ContractMetadata.Type.Variant>typeDef.meta).params;
            // console.dir((<ContractMetadata.Type.Variant>typeDef.meta), { depth: 10 });
            
            return params
                ?.map(param => this.buildCodecType({ type: param.type }))
                .filter(type => !!type)
                .join(' | ');
        }
        else if (typeDef.kind === 'composite') {
            // todo ld 2022-10-31 09:00:10
            return 'any';
        }
        else if (typeDef.kind === 'array') {
            const { type, len } = (<ContractMetadata.Type.ArrayType>typeDef.meta).def.array;
            
            const innerType = this.buildCodecType({ type });
            return `DPT.IVec<${innerType}>`;
        }
        else if (typeDef.kind === 'sequence') {
            const { type } = (<ContractMetadata.Type.Sequence>typeDef.meta).def.sequence;
            
            const innerType = this.buildCodecType({ type });
            return `DPT.IVec<${innerType}>`;
        }
        else {
            throw new Exception(
                'Unknown type',
                1667203276794
            );
        }
    }
    
}
