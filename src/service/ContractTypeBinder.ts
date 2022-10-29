import { ContractMetadata } from '@/def';
import { RuntimeContext } from '@/service/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import * as fs from 'fs';
import upperFirst from 'lodash/upperFirst';
import path from 'path';
import * as TsMorph from 'ts-morph';


type Type = {
    kind : string,
    meta : ContractMetadata.TypeDefType,
};


export class ContractTypeBinder
{
    
    protected _logger = new Logger('ContractTypeBinder');
    
    public contractsBasePath : string;
    public typingsBasePath : string;
    
    protected _types : Record<number, Type>;
    
    
    public constructor (
        public runtimeContext : RuntimeContext
    )
    {
        this.contractsBasePath = path.join(
            this.runtimeContext.projectDir,
            this.runtimeContext.config.directories.contracts
        );
        this.typingsBasePath = path.join(
            this.runtimeContext.projectDir,
            this.runtimeContext.config.directories.typings
        );
    }
    
    public async createBindings (contractName : string) : Promise<boolean>
    {
        this._logger.log('Building:', chalk.blueBright(contractName));
        
        // load & parse metadata
        const contractPath = path.join(this.contractsBasePath, contractName);
        
        const metadataRaw : string = fs.readFileSync(
            path.join(contractPath, 'target', 'ink', 'metadata.json'),
            { encoding: 'utf-8' }
        );
        const metadata : ContractMetadata.Metadata = JSON.parse(metadataRaw);
        
        // check support
        if (!metadata.V3) {
            throw new Exception(
                'Only V3 metadata is supported',
                1667022489434
            );
        }
        
        const abi : ContractMetadata.ABI = metadata.V3;
        const ucfContractName = upperFirst(metadata.contract.name);
        
        // create typings dir
        if (!fs.existsSync(this.typingsBasePath)) {
            fs.mkdirSync(this.typingsBasePath, { recursive: true });
        }
        
        // init context
        this._types = Object.fromEntries(
            metadata.V3.types.map(typeDef => {
                return [
                    typeDef.id,
                    {
                        kind: Object.keys(typeDef.type.def)[0],
                        meta: typeDef.type,
                    }
                ];
            })
        );
        
        // output
        const project = new TsMorph.Project({
            compilerOptions: {
                rootDir: this.typingsBasePath,
            }
        });
        
        const fileName = `${ucfContractName}.ts`;
        const filePath = path.join(this.typingsBasePath, fileName);
        
        const file = project.createSourceFile(filePath, undefined, { overwrite: true });
        
        file.addImportDeclaration({
            namespaceImport: 'DevPhase',
            moduleSpecifier: 'devphase',
        });
        
        file.addModule({
            isExported: true,
            name: ucfContractName,
            statements: [
                this.buildMapMessageQueryInterface(abi),
                this.buildMapMessageTxInterface(abi),
                this.buildContractClass(abi),
                this.buildFactoryClass(abi),
            ]
        });
        
        file.saveSync();
        
        return true;
    }
    
    public buildMapMessageQueryInterface (abi : ContractMetadata.ABI) : TsMorph.InterfaceDeclarationStructure
    {
        return {
            isExported: true,
            kind: TsMorph.StructureKind.Interface,
            name: 'MapMessageQuery',
            extends: [ 'DevPhase.MapMessageQuery' ],
            properties: abi.spec.messages
                .filter(message => message.mutates === false)
                .map(message => ({
                    name: message.label,
                    type: 'DevPhase.ContractQuery',
                }))
        };
    }
    
    public buildMapMessageTxInterface (abi : ContractMetadata.ABI) : TsMorph.InterfaceDeclarationStructure
    {
        return {
            isExported: true,
            kind: TsMorph.StructureKind.Interface,
            name: 'MapMessageTx',
            extends: [ 'DevPhase.MapMessageTx' ],
            properties: abi.spec.messages
                .filter(message => message.mutates === true)
                .map(message => ({
                    name: message.label,
                    type: 'DevPhase.ContractTx',
                }))
        };
    }
    
    public buildContractClass (abi : ContractMetadata.ABI) : TsMorph.ClassDeclarationStructure
    {
        return {
            isExported: true,
            hasDeclareKeyword: true,
            kind: TsMorph.StructureKind.Class,
            name: 'Contract',
            extends: 'DevPhase.PhatContract',
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
        };
    }
    
    public buildFactoryClass (abi : ContractMetadata.ABI) : TsMorph.ClassDeclarationStructure
    {
        return {
            isExported: true,
            hasDeclareKeyword: true,
            kind: TsMorph.StructureKind.Class,
            name: 'Factory',
        };
    }
    
}
