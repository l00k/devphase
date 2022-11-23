import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import chokidar from 'chokidar';
import glob from 'glob';
import path from 'path';


type ExecCallback = (contractName : string) => Promise<boolean>;


export class MultiContractExecutor
{
    
    protected _logger = new Logger(MultiContractExecutor.name);
    
    public constructor (
        public runtimeContext : RuntimeContext
    )
    {}
    
    
    public async exec (
        contractName : string,
        watch : boolean,
        callback : ExecCallback,
    ) : Promise<void>
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
            const result = await callback(contract);
            if (!result) {
                throw new Exception(
                    `Unable to execute action for ${contract} contract`,
                    1667022951192
                );
            }
        }
        
        if (watch) {
            const contractsBasePath = this.runtimeContext.paths.contracts;
        
            const patternsToWatch = matchedContracts.map(contract => {
                return path.join(contractsBasePath, contract);
            });
            const patternsToIgnore = matchedContracts.map(contract => {
                return path.join(contractsBasePath, contract, 'target');
            });
            
            const watcher = chokidar.watch(patternsToWatch, {
                ignored: patternsToIgnore
            });
            
            watcher.on('change', (_path, stats) => {
                const relPath = path.relative(contractsBasePath, _path);
                const contractName = relPath.split('/')[0];
                
                this._logger.log('Change detected in', chalk.blueBright(contractName));
                
                callback(contractName);
            });
        }
    }
    
    public matchContracts (contractName? : string) : string[]
    {
        const allContracts = glob.sync('*', { cwd: this.runtimeContext.paths.contracts });
        
        if (contractName) {
            return allContracts.filter(contract => contract.toLowerCase() === contractName.toLowerCase());
        }
        else {
            return allContracts;
        }
    }
    
}
