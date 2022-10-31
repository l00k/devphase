import { ContractMetadata } from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { AbiTypeBindingProcessor } from '@/service/type-binding/AbiTypeBindingProcessor';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import * as fs from 'fs';
import upperFirst from 'lodash/upperFirst';
import path from 'path';


export class TypeBinder
{
    
    protected _logger = new Logger(TypeBinder.name);
    
    protected _contractsBasePath : string;
    protected _typingsBasePath : string;
    
    
    public constructor (
        public runtimeContext : RuntimeContext
    )
    {
        this._contractsBasePath = path.join(
            this.runtimeContext.projectDir,
            this.runtimeContext.config.directories.contracts
        );
        this._typingsBasePath = path.join(
            this.runtimeContext.projectDir,
            this.runtimeContext.config.directories.typings
        );
    }
    
    public async createBindings (contractName : string) : Promise<boolean>
    {
        this._logger.log('Building:', chalk.blueBright(contractName));
        
        // load & parse metadata
        const contractPath = path.join(this._contractsBasePath, contractName);
        
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
        if (!fs.existsSync(this._typingsBasePath)) {
            fs.mkdirSync(this._typingsBasePath, { recursive: true });
        }
        
        // process
        const filePath = path.join(
            this._typingsBasePath,
            `${ucfContractName}.ts`
        );
        
        await AbiTypeBindingProcessor.createTypeBindingFile(
            filePath,
            ucfContractName,
            abi
        );
        
        return true;
    }
    
    
}
