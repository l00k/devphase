import { RuntimeContext } from '@/service/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import childProcess from 'child_process';
import chokidar from 'chokidar';
import * as fs from 'fs';
import glob from 'glob';
import path from 'path';


export type CompileOptions = {
    watch : boolean,
    release : boolean
}


export class ContractCompiler
{
    
    protected _logger = new Logger('ContractCompiler');
    
    public contractsBasePath : string;
    
    public constructor (
        public runtimeContext : RuntimeContext
    )
    {
        this.contractsBasePath = path.join(
            this.runtimeContext.projectDir,
            this.runtimeContext.config.directories.contracts
        );
    }
    
    
    public async compileAll (
        contractName : string,
        options : CompileOptions = { watch: false, release: false },
    )
    {
        if (contractName) {
            this._logger.log('Criteria:', chalk.cyan(contractName));
        }
        else {
            this._logger.log('Criteria:', chalk.yellow('any'));
        }
        
        const matchedContracts = this.matchContracts(contractName);
        this._logger.log('Matched contracts:', matchedContracts);
        
        if (!matchedContracts.length) {
            this._logger.log('Nothing to do');
            return;
        }
        
        for (const contract of matchedContracts) {
            const result = await this.compileContract(contract, options.release);
            if (!result) {
                throw new Exception(
                    `Unable to compile ${contract} contract`,
                    1666575816175
                );
            }
        }
        
        if (options.watch) {
            const patternsToWatch = matchedContracts.map(contract => {
                return path.join(this.contractsBasePath, contract);
            });
            const patternsToIgnore = matchedContracts.map(contract => {
                return path.join(this.contractsBasePath, contract, 'target');
            });
            
            const watcher = chokidar.watch(patternsToWatch, {
                ignored: patternsToIgnore
            });
            
            watcher.on('change', (_path, stats) => {
                const relPath = path.relative(this.contractsBasePath, _path);
                const contractName = relPath.split('/')[0];
                
                this._logger.log('Change detected in', chalk.blueBright(contractName));
                
                this.compileContract(contractName, options.release);
            });
        }
    }
    
    public matchContracts (contractName? : string) : string[]
    {
        const allContracts = glob.sync(`*`, { cwd: this.contractsBasePath });
        
        if (contractName) {
            return allContracts.filter(contract => contract.toLowerCase() === allContracts.toLowerCase());
        }
        else {
            return allContracts;
        }
    }
    
    public async compileContract (
        contractName : string,
        releaseMode : boolean
    ) : Promise<boolean>
    {
        const contractPath = path.join(this.contractsBasePath, contractName);
        
        this._logger.log('Building:', chalk.blueBright(contractName));
        
        const args = [ '+nightly', 'contract', 'build' ];
        if (releaseMode) {
            args.push('--release');
        }
        
        const child = await childProcess.spawn(
            'cargo',
            args,
            {
                cwd: contractPath,
            }
        );
        
        child.stdout.setEncoding('utf-8');
        child.stderr.setEncoding('utf-8');
        
        child.stdout.on('data', text => process.stdout.write(text));
        child.stderr.on('data', text => process.stdout.write(text));
        
        const resultCode = await new Promise(resolve => {
            child.on('exit', code => resolve(code));
        });
        
        if (resultCode !== 0) {
            this._logger.error('Failed building contract');
            return false;
        }
        
        // check files
        const filesToCheck = [
            path.join(contractPath, 'target', 'ink', `${contractName}.contract`),
            path.join(contractPath, 'target', 'ink', `${contractName}.wasm`),
            path.join(contractPath, 'target', 'ink', 'metadata.json'),
        ];
        for (const fileToCheck of filesToCheck) {
            if (!fs.existsSync(fileToCheck)) {
                this._logger.error('File', fileToCheck, 'not generated');
                return false;
            }
        }
        
        this._logger.log(
            'Files generated under',
            filesToCheck.map(file => path.relative(this.runtimeContext.projectDir, file))
        );
        
        return true;
    }
    
}
