import { RuntimeContext } from '@/service/project/RuntimeContext';
import { AbiTypeBindingProcessor } from '@/service/type-binding/AbiTypeBindingProcessor';
import { ContractMetadata } from '@/typings';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import * as fs from 'fs';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import path from 'path';


export class TypeBinder
{
    
    protected _logger = new Logger(TypeBinder.name);
    
    
    public constructor (
        public runtimeContext : RuntimeContext
    )
    {}
    
    public async createBindings (contractName : string) : Promise<boolean>
    {
        this._logger.log('Generating type bindings for:', chalk.blueBright(contractName));
        
        // load & parse metadata
        const artifactsPath = path.join(
            this.runtimeContext.paths.artifacts,
            contractName
        );
        
        const metadataFilePath = path.join(artifactsPath, 'metadata.json');
        if (!fs.existsSync(metadataFilePath)) {
            throw new Exception(
                'Metadata file not found',
                1667222247617
            );
        }
        
        const metadataRaw : string = fs.readFileSync(
            metadataFilePath,
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
        const pcContractName = upperFirst(camelCase(metadata.contract.name));
        
        // create typings dir
        const typingsBasePath = this.runtimeContext.paths.typings;
        if (!fs.existsSync(typingsBasePath)) {
            fs.mkdirSync(typingsBasePath, { recursive: true });
        }
        
        // process
        const filePath = path.join(
            typingsBasePath,
            `${pcContractName}.ts`
        );
        
        await AbiTypeBindingProcessor.createTypeBindingFile(
            filePath,
            pcContractName,
            abi
        );
        
        return true;
    }
    
    
}
