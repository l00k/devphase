import { RuntimeContext } from '@/service/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import childProcess from 'child_process';
import chokidar from 'chokidar';
import * as fs from 'fs';
import glob from 'glob';
import path from 'path';

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
        watch : boolean = false
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
            const result = await this.compileContract(contract);
            if (!result) {
                throw new Exception(
                    `Unable to compile ${contract} contract`,
                    1666575816175
                );
            }
        }
        
        if (watch) {
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
            
                this.compileContract(contractName);
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
    
    public async compileContract (contractName : string) : Promise<boolean>
    {
        const contractPath = path.join(this.contractsBasePath, contractName);
        
        this._logger.log('Building:', chalk.blueBright(contractName));
        
        const result = await childProcess.spawnSync(
            'cargo',
            [ '+nightly', 'contract', 'build' ],
            {
                cwd: contractPath,
            }
        );
        
        if (result.status !== 0) {
            this._logger.error('Could not build contract:');
            this._logger.error(result.stdout);
            this._logger.error(result.stderr);
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
