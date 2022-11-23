import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


export class Initializer
{
    
    protected _logger = new Logger(Initializer.name);
    
    protected _templates : string[] = [
        '.gitignore',
        'devphase.config.ts',
    ];
    
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
            throw new Exception(
                'Project already initiated',
                1667764070755
            );
        }
        
        // copy templates
        this._logger.log('Creating files');
        
        for (const templateFile of this._templates) {
            const sourceTemplatePath = path.join(
                this._runtimeContext.paths.devphase,
                'templates',
                templateFile
            );
            
            const targetFilePath = `./${templateFile}`;
            if (fs.existsSync(targetFilePath)) {
                continue;
            }
            
            this._logger.log(chalk.cyan(templateFile));
            
            fs.copyFileSync(
                sourceTemplatePath,
                targetFilePath
            );
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
        
        return true;
    }
    
}
