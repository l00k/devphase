import { ProjectConfig, RecursivePartial, RunMode, RuntimeContext, VerbosityLevel } from '@devphase/service';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


const ROOT_PATH = process.cwd();
const CONTEXT_PATH = path.resolve(
    ROOT_PATH,
    './tests/context'
);


before(async function() {
    this.timeout(3 * 60 * 1000);
    await cleanUpContext();
    await requestStackBinaries();
});


export {
    ROOT_PATH,
    CONTEXT_PATH
};

export async function createConfigFile (projectConfig : RecursivePartial<ProjectConfig> = {})
{
    const configFilePath = path.join(
        CONTEXT_PATH,
        'devphase.config.json'
    );
    fs.writeFileSync(
        configFilePath,
        JSON.stringify(projectConfig),
        { encoding: 'utf-8' }
    );
}

export async function cleanUpContext (
    preserveFiles : string[] = []
)
{
    if (!preserveFiles.length) {
        preserveFiles = [
            '.gitignore',
            '.devphase',
            'contracts',
            'stacks',
            'tests'
        ];
    }
    
    // clean up context
    const files = fs.readdirSync(CONTEXT_PATH);
    const filesToDelete = files.filter(file => !preserveFiles.includes(file));
    
    filesToDelete.forEach(file => {
        const filePath = path.join(
            CONTEXT_PATH,
            file
        );
        fs.rmSync(filePath, { recursive: true });
    });
    
    // change working dir to context
    process.chdir(CONTEXT_PATH);
}

export async function requestStackBinaries ()
{
    process.chdir(CONTEXT_PATH);
    
    console.log(chalk.yellow('>>> Requesting stack binaries'));
    
    const runtimeContext = await RuntimeContext.getSingleton();
    
    await runtimeContext.initContext(RunMode.Simple);
    await runtimeContext.requestStackBinaries();
    
    console.log(chalk.yellow('>>> Done'));
    console.log();
}
