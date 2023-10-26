import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import chokidar from 'chokidar';
import glob from 'glob';
import Listr from 'listr';
import path from 'path';


type ExecCallback = (contractName : string) => Promise<Listr>;


export class MultiContractExecutor
{
    
    protected _logger : Logger = new Logger('MultiContractExecutor');
    
    public constructor (
        public runtimeContext : RuntimeContext
    )
    {}
    
    
    public async exec (
        contractNamePattern : string,
        watch : boolean,
        callback : ExecCallback,
    ) : Promise<Listr>
    {
        if (contractNamePattern) {
            this._logger.log('Criteria:', chalk.cyan(contractNamePattern));
        }
        else {
            this._logger.log('Criteria:', chalk.yellow('any'));
        }
        
        const matchedContracts = this.matchContracts(contractNamePattern);
        if (!matchedContracts.length) {
            this._logger.log('Nothing to do');
            return null;
        }
        
        this._logger.log('Matched contracts:');
        this._logger.log(matchedContracts.map(name => chalk.cyan(name)).join(', '));
        this._logger.log('');
        
        const listrOpts = [];
        for (const contract of matchedContracts) {
            listrOpts.push({
                title: chalk.cyan(contract),
                task: () => callback(contract),
            });
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
                
                this._logger.log(chalk.yellow('Change detected in'));
                this._logger.log(chalk.blueBright(contractName));
                
                callback(contractName);
            });
        }
        
        return new Listr(listrOpts, {
            renderer: this.runtimeContext.listrRenderer
        });
    }
    
    public matchContracts (contractName? : string) : string[]
    {
        const allContracts = glob
            .sync('*/Cargo.toml', { cwd: this.runtimeContext.paths.contracts })
            .map(tomlFile => path.dirname(tomlFile))
            ;
        
        if (contractName) {
            return allContracts.filter(contract => contract.toLowerCase() === contractName.toLowerCase());
        }
        else {
            return allContracts;
        }
    }
    
}
