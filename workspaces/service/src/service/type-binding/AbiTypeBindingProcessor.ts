import { StructTypeBuilder } from '@/service/type-binding/StructTypeBuilder';
import { ContractMetadata } from '@/typings/ContractMetadata';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import path from 'path';
import { StructureKind } from 'ts-morph';
import * as TsMorph from 'ts-morph';


export class AbiTypeBindingProcessor
{
    
    public structTypeBuilder : StructTypeBuilder;
    
    
    public constructor (
        protected readonly _abi : ContractMetadata.ABI,
        protected readonly _contractName : string,
    )
    {
        this.structTypeBuilder = new StructTypeBuilder(
            this._abi.types,
            this._contractName
        );
        this.structTypeBuilder.build();
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
        const context = new AbiTypeBindingProcessor(abi, contractName);
        
        // imports
        file.addStatements(context.getImportStatements());
        
        // type structures
        file.addStatements([
            '\n\n/** */\n/** Exported types */\n/** */\n',
            ...context.structTypeBuilder.getExportedStructures()
        ]);
        
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
                kind: StructureKind.ImportDeclaration,
                isTypeOnly: true,
                namespaceImport: 'PhalaSdk',
                moduleSpecifier: '@phala/sdk',
            },
            {
                kind: StructureKind.ImportDeclaration,
                isTypeOnly: true,
                namespaceImport: 'DevPhase',
                moduleSpecifier: '@devphase/service',
            },
            {
                kind: StructureKind.ImportDeclaration,
                isTypeOnly: true,
                namespaceImport: 'DPT',
                moduleSpecifier: '@devphase/service/etc/typings',
            },
            {
                kind: StructureKind.ImportDeclaration,
                isTypeOnly: true,
                namedImports: [ 'ContractCallResult', 'ContractQuery' ],
                moduleSpecifier: '@polkadot/api-contract/base/types',
            },
            {
                kind: StructureKind.ImportDeclaration,
                isTypeOnly: true,
                namedImports: [ 'ContractCallOutcome', 'ContractOptions' ],
                moduleSpecifier: '@polkadot/api-contract/types',
            },
            {
                kind: StructureKind.ImportDeclaration,
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
            .filter(message => message.mutates === false)
            ;
            
        for (const queryMessage of queryMessages) {
            const name = this.formatInterfaceName(queryMessage.label);
            const returnType = queryMessage.returnType
                ? this.structTypeBuilder.getCodecType(queryMessage.returnType.type)
                : null;
            
            queriesModuleInterfaces.push({
                isExported: true,
                kind: StructureKind.Interface,
                name,
                extends: [ 'DPT.ContractQuery' ],
                callSignatures: [
                    {
                        kind: StructureKind.CallSignature,
                        parameters: [
                            {
                                kind: StructureKind.Parameter,
                                name: 'certificateData',
                                type: 'PhalaSdk.CertificateData'
                            },
                            {
                                kind: StructureKind.Parameter,
                                name: 'options',
                                type: 'ContractOptions'
                            },
                            ...queryMessage.args.map<TsMorph.ParameterDeclarationStructure>(arg => ({
                                kind: StructureKind.Parameter,
                                name: arg.label,
                                
                                type: this.structTypeBuilder.getNativeType(arg.type.type),
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
                kind: StructureKind.Module,
                declarationKind: TsMorph.ModuleDeclarationKind.Namespace,
                name: 'ContractQuery',
                statements: queriesModuleInterfaces,
            },
            <TsMorph.InterfaceDeclarationStructure>{
                kind: StructureKind.Interface,
                name: 'MapMessageQuery',
                extends: [ 'DPT.MapMessageQuery' ],
                properties: this._abi.spec.messages
                    .filter(message => message.mutates === false)
                    .map(message => ({
                        kind: StructureKind.PropertySignature,
                        name: this.formatContractMethodName(message.label),
                        type: 'ContractQuery.' + this.formatInterfaceName(message.label),
                    }))
            }
        ];
    }
    
    public buildMapMessageTxInterface () : TsMorph.KindedStructure<any>[]
    {
        const txsModuleInterfaces : TsMorph.InterfaceDeclarationStructure[] = [];
        
        const txMessages = this._abi.spec.messages
            .filter(message => message.mutates === true)
            ;
            
        for (const txMessage of txMessages) {
            const name = this.formatInterfaceName(txMessage.label);
            
            txsModuleInterfaces.push({
                isExported: true,
                kind: StructureKind.Interface,
                name,
                extends: [ 'DPT.ContractTx' ],
                callSignatures: [
                    {
                        kind: StructureKind.CallSignature,
                        parameters: [
                            {
                                kind: StructureKind.Parameter,
                                name: 'options',
                                type: 'ContractOptions'
                            },
                            ...txMessage.args.map<TsMorph.ParameterDeclarationStructure>(arg => ({
                                kind: StructureKind.Parameter,
                                name: arg.label,
                                type: this.structTypeBuilder.getNativeType(arg.type.type),
                            })),
                        ],
                        returnType: 'DPT.SubmittableExtrinsic',
                    }
                ]
            });
        }
        
        return [
            <TsMorph.ModuleDeclarationStructure>{
                docs: [ '', 'Transactions', '' ],
                kind: StructureKind.Module,
                name: 'ContractTx',
                statements: txsModuleInterfaces,
            },
            <TsMorph.InterfaceDeclarationStructure>{
                kind: StructureKind.Interface,
                name: 'MapMessageTx',
                extends: [ 'DPT.MapMessageTx' ],
                properties: this._abi.spec.messages
                    .filter(message => message.mutates === true)
                    .map(message => ({
                        kind: StructureKind.PropertySignature,
                        name: this.formatContractMethodName(message.label),
                        type: 'ContractTx.' + this.formatInterfaceName(message.label),
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
                kind: StructureKind.Class,
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
                kind: StructureKind.Class,
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
                            type: this.structTypeBuilder.getArgsString(constructor.args),
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
    
    public formatInterfaceName (label : string) : string
    {
        return label.split('::')
            .map(part => upperFirst(camelCase(part)))
            .join('_')
            ;
    }
    
    public formatContractMethodName (label : string) : string
    {
        const methodName = label.split('::')
            .map(part => camelCase(part))
            .join('::')
        ;
        return methodName.includes('::')
            ? `'${methodName}'`
            : methodName
            ;
    }
    
}
