import { RuntimeContext } from '@/service/project/RuntimeContext';
import { ux } from '@oclif/core';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


export class Initializer
{
    
    protected _templates : Record<string, string> = {
        'gitignore': '.gitignore',
        'accounts.json': 'accounts.json',
        'devphase.config.ts': 'devphase.config.ts',
    };
    
    protected _directories : string[] = [
        'contracts',
        'tests',
    ];
    
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {}
    
    public async init () : Promise<boolean>
    {
        const inProjectDirectory = await this._runtimeContext.isInProjectDirectory();
        if (inProjectDirectory) {
            ux.debug('Project already initiated');
            return false;
        }
        
        // copy templates
        ux.debug('Creating files');
        
        for (const [ fromTemplateFile, toTemplateFile ] of Object.entries(this._templates)) {
            const sourceTemplatePath = path.join(
                this._runtimeContext.paths.templates,
                fromTemplateFile
            );
            
            const targetFilePath = `./${toTemplateFile}`;
            if (fs.existsSync(targetFilePath)) {
                continue;
            }
            
            ux.log(chalk.cyan(toTemplateFile));
            
            fs.copyFileSync(
                sourceTemplatePath,
                targetFilePath
            );
        }
        
        // create directories
        ux.debug('Creating directories');
        
        for (const directory of this._directories) {
            const targetDirectoryPath = `./${directory}`;
            if (fs.existsSync(targetDirectoryPath)) {
                continue;
            }
            
            ux.log(chalk.cyan(directory));
            
            fs.mkdirSync(targetDirectoryPath);
        }
        
        return true;
    }
    
}
