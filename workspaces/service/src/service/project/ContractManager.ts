import { ContractType, ProjectComponent } from '@/def';
import { DeployOptions, InstantiateOptions } from '@/service/api/ContractFactory';
import { CompilationResult, Compiler } from '@/service/project/contract/Compiler';
import { TypeBinder } from '@/service/project/contract/TypeBinder';
import { ValidationResult, Validator } from '@/service/project/contract/Validator';
import { MultiContractExecutor } from '@/service/project/MultiContractExecutor';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Contract } from '@/typings';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import * as PhalaSdk from '@phala/sdk';
import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import _ from 'lodash';
import path from 'path';
import glob from 'glob';
import { Project } from 'ts-morph';


export class ContractManager
{
    
    protected _logger : Logger = new Logger('ContractManager');
    
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {}
    
    public async loadContractsDefFromStorageFile () : Promise<ContractManager.ContractDefinition[]>
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
    
    protected async _addContractDefToStorageFile (
        contractDef : ContractManager.ContractDefinition
    )
    {
        const contractsStoragePath = path.join(
            this._runtimeContext.paths.project,
            'contracts.json'
        );
        
        let currentData : ContractManager.ContractDefinition[] = await this.loadContractsDefFromStorageFile();
        if (!currentData) {
            currentData = [];
        }
        
        currentData.push(contractDef);
        
        const outData = JSON.stringify(currentData);
        
        fs.writeFileSync(
            contractsStoragePath,
            outData,
            { encoding: 'utf-8' }
        );
    }
    
    public async loadContract<T extends Contract> (
        contractDef : ContractManager.ContractDefinition,
    ) : Promise<T>
    {
        const devPhase = this._runtimeContext.getDevPhase();
        
        const contractFactory = await devPhase.getFactory(
            contractDef.name,
            {
                clusterId: contractDef.clusterId,
                contractType: contractDef.type,
            }
        );
        
        return <any> contractFactory.attach(contractDef.contractId);
    }
    
    public async createNew (
        options : ContractManager.ContractCreateNewOptions
    ) : Promise<any>
    {
        const contractNameValidator = value => /^[a-z][a-z0-9_]+$/.test(value);
        if (!contractNameValidator(options.name)) {
            throw new Exception(
                'Unallowed characters in contract name ^[a-z][a-z0-9_]+$',
                1673533712922
            );
        }
        
        // prepare placeholders values
        const nameSnakeCase = _.snakeCase(options.name);
        const namePascalCase = _.startCase(_.camelCase(options.name)).replaceAll(' ', '');
        
        const components = [
            'contracts',
            'tests',
        ];
        
        const targetPaths : Record<ProjectComponent, string> = <any> {};
        
        for (const component of components) {
            const templateDirPath = path.join(
                this._runtimeContext.paths.templates,
                component,
                options.template
            );
            if (!fs.existsSync(templateDirPath)) {
                throw new Exception(
                    `Component ${component} for template ${options.template} does not exist`,
                    1679837411410
                );
            }
            
            const targetDirPath = path.join(
                this._runtimeContext.paths[component],
                nameSnakeCase,
            );
            
            // check it already exists
            if (fs.existsSync(targetDirPath)) {
                throw new Exception(
                    `Contract files for ${options.name} already exists`,
                    1673534385418
                );
            }
            
            // copy template
            fs.cpSync(
                templateDirPath,
                targetDirPath,
                { recursive: true }
            );
            
            // replace placeholders
            const placeholders = {
                '{{contract_name}}': nameSnakeCase,
                '{{ContractName}}': namePascalCase
            };
            
            const templateFiles = glob.sync('*', {
                cwd: targetDirPath,
                nodir: true,
            });
            
            for (const templateFile of templateFiles) {
                const filePath = path.join(
                    targetDirPath,
                    templateFile
                );
                
                await this._replacePlaceholdersInFile(
                    filePath,
                    placeholders
                );
            }
        
            const ucComponent = _.startCase(component);
            this._logger.info(
                chalk.green(`${ucComponent} created in:`),
                targetDirPath
            );
            
            targetPaths[component] = targetDirPath;
        }
        
        return {
            name: {
                snakeCase: nameSnakeCase,
                pascalCase: namePascalCase,
            },
            paths: targetPaths,
        };
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
    
    public async compile (
        options : ContractManager.ContractCompileOptions
    ) : Promise<Record<string, ContractManager.ContractCompilationResult>>
    {
        const multiContractExecutor = new MultiContractExecutor(this._runtimeContext);
        const compiler = new Compiler(this._runtimeContext);
        const validator = new Validator(this._runtimeContext);
        const typeBinder = new TypeBinder(this._runtimeContext);
        
        const compilationResults : Record<string, ContractManager.ContractCompilationResult> = {};
        
        const listr = await multiContractExecutor.exec(
            options.contractName,
            options.watch,
            async(contractName) => {
                return new Listr([
                    {
                        title: 'Compilation',
                        task: async() => {
                            const result = await compiler.compile(
                                contractName,
                                options.release
                            );
                            if (!result.result) {
                                throw new Exception(
                                    'Unable to compile',
                                    1675312571299
                                );
                            }
                            
                            compilationResults[contractName] = {
                                compilation: result,
                                validation: null,
                                typeBinding: null,
                            };
                        }
                    },
                    {
                        title: 'Validation',
                        task: async() => {
                            compilationResults[contractName].validation = await validator.validate(contractName);
                        }
                    },
                    {
                        title: 'Type binding',
                        task: async() => {
                            compilationResults[contractName].typeBinding = await typeBinder.createBindings(contractName);
                        }
                    }
                ], {
                    renderer: this._runtimeContext.listrRenderer
                });
            }
        );
        
        await listr.run();
        
        return compilationResults;
    }
    
    public async validate (
        options : ContractManager.ContractValidateOptions
    ) : Promise<Record<string, ValidationResult>>
    {
        const multiContractExecutor = new MultiContractExecutor(this._runtimeContext);
        const validator = new Validator(this._runtimeContext);
        
        const validationResults : Record<string, ValidationResult> = {};
        
        const listr = await multiContractExecutor.exec(
            options.contractName,
            false,
            async(contractName) => {
                return new Listr([
                    {
                        title: 'Validation',
                        task: async() => {
                            validationResults[contractName] = await validator.validate(contractName);
                        }
                    },
                ], {
                    renderer: this._runtimeContext.listrRenderer
                });
            }
        );
        
        await listr.run();
        
        return validationResults;
    }
    
    public async deploy (
        contractName : string,
        constructor : string,
        ctorArgs : string[],
        options : ContractManager.ContractDeployOptions
    )
    {
        options = {
            network: RuntimeContext.NETWORK_LOCAL,
            contractType: ContractType.InkCode,
            ...options
        };
        
        const devPhase = await this._runtimeContext.initDevPhase(options.network);
        
        const contractFactory = await devPhase.getFactory(
            contractName,
            {
                clusterId: options.clusterId,
                contractType: options.contractType,
            }
        );
        
        // deploy
        const deployOptions : DeployOptions = {};
        if (options.account) {
            deployOptions.asAccount = options.account;
        }
        
        await contractFactory.deploy(deployOptions);
        
        // instantiate
        const instantiateOptions : InstantiateOptions = {};
        if (options.account) {
            instantiateOptions.asAccount = options.account;
        }
        
        const instance = await contractFactory.instantiate(
            constructor,
            ctorArgs,
            instantiateOptions
        );
        
        // save in contracts file
        await this._addContractDefToStorageFile({
            name: contractName,
            network: options.network,
            contractId: instance.contractId,
            type: options.contractType,
            clusterId: instance.clusterId,
        });
        
        await devPhase.cleanup();
        
        return instance;
    }
    
    public async contractCall (
        contractName : string,
        contractId : string,
        callType : ContractManager.ContractCallType = ContractManager.ContractCallType.Query,
        methodName : string,
        args : string[],
        options : ContractManager.ContractCallOptions
    ) : Promise<any>
    {
        options = {
            network: RuntimeContext.NETWORK_LOCAL,
            contractType: ContractType.InkCode,
            ...options
        };
        
        const devPhase = await this._runtimeContext.initDevPhase(options.network);
        
        const contractFactory = await devPhase.getFactory(
            contractName,
            {
                clusterId: options.clusterId,
                contractType: options.contractType,
            }
        );
        
        // get instance
        const instance = await contractFactory.attach(contractId);
        
        // prepare certifiacte
        const signer = devPhase.accounts[options.account];
        if (!signer) {
            throw new Exception(
                `Undefined account ${options.account}`,
                1675412062711
            );
        }
        
        const cert : PhalaSdk.CertificateData = await PhalaSdk.signCertificate({ pair: signer });
        
        // prepare method call
        if (!instance[callType][methodName]) {
            throw new Exception(
                `Undefined method ${callType}.${methodName}`,
                1675411765889
            );
        }
        
        let result : any;
        
        if (callType === ContractManager.ContractCallType.Query) {
            const contractCall = instance.query[methodName];
            const outcome = await contractCall(signer.address, { cert }, ...args);
            
            result = {
                output: outcome.output.toJSON(),
                debugMessage: outcome.debugMessage.toJSON(),
                result: outcome.result.toJSON(),
                gasConsumed: outcome.gasConsumed.toJSON(),
                gasRequired: outcome.gasRequired.toJSON(),
                storageDeposit: outcome.storageDeposit.toJSON(),
            };
        }
        else {
            const contractCall = instance.tx[methodName];
            const outcome = await contractCall({}, ...args).signAndSend(signer);
            
            result = outcome.toJSON();
        }
        
        await devPhase.cleanup();
        
        return result;
    }
    
}


export namespace ContractManager {
    export type ContractDefinition = {
        name : string,
        type : ContractType,
        network : string,
        contractId : string,
        clusterId? : string,
    }
    
    export type ContractCreateNewOptions = {
        name? : string,
        template? : string,
    };
    
    export type ContractCompileOptions = {
        contractName? : string,
        watch? : boolean,
        release? : boolean,
    };
    
    export type ContractValidateOptions = {
        contractName? : string,
    };
    
    export type ContractCompilationResult = {
        compilation : CompilationResult,
        validation : ValidationResult,
        typeBinding : boolean,
    }
    
    export type ContractDeployOptions = {
        contractType? : ContractType,
        clusterId? : string,
        network? : string,
        account : string,
    };
    
    export type ContractCallOptions = {
        contractType? : ContractType,
        clusterId? : string,
        network? : string,
        account : string,
    };
    
    export enum ContractCallType
    {
        Query = 'query',
        Tx = 'tx',
    };
}
