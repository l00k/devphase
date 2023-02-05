import { RuntimeContext } from '@/service/project/RuntimeContext';
import { ux } from '@oclif/core';
import chalk from 'chalk';
import chokidar from 'chokidar';
import glob from 'glob';
import Listr from 'listr';
import path from 'path';


type ExecCallback = (contractName : string) => Promise<Listr>;


export class MultiContractExecutor
{
    
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
            ux.debug('Criteria:', chalk.cyan(contractNamePattern));
        }
        else {
            ux.debug('Criteria:', chalk.yellow('any'));
        }
        
        const matchedContracts = this.matchContracts(contractNamePattern);
        if (!matchedContracts.length) {
            ux.debug('Nothing to do');
            return null;
        }
        
        ux.debug('Matched contracts:');
        ux.debug(matchedContracts.map(name => chalk.cyan(name)).join(', '));
        ux.debug('');
        
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
                
                ux.debug(chalk.yellow('Change detected in'));
                ux.debug(chalk.blueBright(contractName));
                
                callback(contractName);
            });
        }
        
        return new Listr(listrOpts, {
            renderer: this.runtimeContext.listrRenderer
        });
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
