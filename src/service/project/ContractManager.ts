import { ContractType } from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Contract } from '@/typings';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import _ from 'lodash';


export type ContractDefinition = {
    name : string,
    type : ContractType,
    network : string,
    contractId : string,
    clusterId? : string,
}

export type ContractCreateNewArgs = {
    name : string,
};


export class ContractManager
{
    
    protected static readonly TEMPLATE_FILES : string[] = [
        'Cargo.toml',
        'lib.rs'
    ];
    
    protected _logger = new Logger(ContractManager.name);
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {}
    
    public async loadContractsDefFromStorageFile () : Promise<ContractDefinition[]>
    {
        const contractsStoragePath = path.join(
            this._runtimeContext.paths.project,
            'contracts.json'
        );
        if (!fs.existsSync(contractsStoragePath)) {
            return null;
        }
        
        return JSON.parse(
            fs.readFileSync(contractsStoragePath, { encoding: 'utf-8' })
        );
    }
    
    public async loadContract<T extends Contract> (
        contractDef : ContractDefinition,
    ) : Promise<T>
    {
        const devPhase = this._runtimeContext.getDevPhase();
        
        const contractFactory = await devPhase.getFactory(
            contractDef.type,
            contractDef.name,
            { clusterId: contractDef.clusterId }
        );
        
        return contractFactory.attach(contractDef.contractId);
    }
    
    public async createNew (args : Partial<ContractCreateNewArgs>)
    {
        const contractNameValidator = name => /^[a-z][a-z0-9_]+$/.test(name);
        
        if (!args.name) {
            const { name } = await prompts({
                type: 'text',
                name: 'name',
                message: `Contract name:`,
                validate: contractNameValidator
            });
            args.name = name;
        }
        
        if (!contractNameValidator(args.name)) {
            throw new Exception(
                'Unallowed characters in contract name',
                1673533712922
            );
        }
        
        const templatePath = path.join(
            this._runtimeContext.paths.templates,
            'contract',
        );
        const targetContractPath = path.join(
            this._runtimeContext.paths.contracts,
            args.name,
        );
        
        // check it already exists
        if (fs.existsSync(targetContractPath)) {
            throw new Exception(
                'Contract already exists',
                1673534385418
            );
        }
        
        // copy template
        
        fs.cpSync(
            templatePath,
            targetContractPath,
            { recursive: true }
        );
        
        // replace placeholders
        const placeholders = {
            '{{contract_name}}': args.name,
            '{{ContractName}}': _.startCase(_.camelCase(args.name)),
        };
        
        for (const file of ContractManager.TEMPLATE_FILES) {
            const filePath = path.join(
                targetContractPath,
                file
            );
            
            await this._replacePlaceholdersInFile(
                filePath,
                placeholders
            );
        }
        
        this._logger.log(
            'Contract created in',
            targetContractPath
        );
    }
    
    protected async _replacePlaceholdersInFile (
        filePath : string,
        placeholders : Record<string, string>
    )
    {
        let fileData = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        for (const [ placeholder, value ] of Object.entries(placeholders)) {
            fileData = fileData.replaceAll(placeholder, value);
        }
        
        fs.writeFileSync(filePath, fileData, { encoding: 'utf-8' });
    }
    
}
