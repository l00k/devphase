import { ContractManager } from '@/service/project/ContractManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


export class Initializer
{
    
    protected _templates : Record<string, string> = {
        'gitignore': '.gitignore',
        'tsconfig.json': 'tsconfig.json',
        'devphase.config.ts': 'devphase.config.ts',
        'accounts.json': 'accounts.json',
        'scripts': 'scripts',
    };
    
    protected _directories : string[] = [
        'contracts',
        'tests',
    ];
    
    protected _logger : Logger = new Logger('Initializer');
    
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {}
    
    public async init () : Promise<boolean>
    {
        const inProjectDirectory = await this._runtimeContext.isInProjectDirectory();
        if (inProjectDirectory) {
            this._logger.log('Project already initiated');
            return false;
        }
        
        // create directories
        this._logger.log('Creating directories');
        
        for (const directory of this._directories) {
            const targetDirectoryPath = `./${directory}`;
            if (fs.existsSync(targetDirectoryPath)) {
                continue;
            }
            
            this._logger.log(chalk.cyan(directory));
            
            fs.mkdirSync(targetDirectoryPath);
        }
        
        // copy templates
        this._logger.log('Creating files');
        
        for (const [ fromTemplateFile, toTemplateFile ] of Object.entries(this._templates)) {
            const sourceTemplatePath = path.join(
                this._runtimeContext.paths.templates,
                fromTemplateFile
            );
            
            const targetFilePath = `./${toTemplateFile}`;
            if (fs.existsSync(targetFilePath)) {
                continue;
            }
            
            this._logger.log(chalk.cyan(toTemplateFile));
            
            fs.cpSync(
                sourceTemplatePath,
                targetFilePath,
                { recursive: true }
            );
        }
        
        // create sample contract
        this._logger.log('Creating sample contract');
        
        const contractManager = new ContractManager(this._runtimeContext);
        await contractManager.createNew({
            name: 'flipper',
            template: 'flipper'
        });
        
        return true;
    }
    
}
