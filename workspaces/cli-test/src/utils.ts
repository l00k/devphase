import { ProjectConfig, RecursivePartial, RunMode, RuntimeContext } from '@devphase/service';
import chalk from 'chalk';
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import { Readable, Writable } from 'stream';


const ROOT_PATH = process.cwd();
const CONTEXT_PATH = path.resolve(
    ROOT_PATH,
    './context'
);


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
    
    process.chdir(ROOT_PATH);
}


export type RunCommandResult = {
    stdout : string,
    stderr : string,
    status : number,
    signal : string,
}

export async function runCommand (
    command : string,
    args : string[],
    timeout : number = 2_000
) : Promise<RunCommandResult>
{
    const result = childProcess.spawnSync(
        '../node_modules/.bin/devphase',
        [
            command,
            ...args
        ],
        {
            cwd: CONTEXT_PATH,
            timeout,
        }
    );
    
    return {
        stdout: result.stdout.toString('utf-8'),
        stderr: result.stderr.toString('utf-8'),
        status: result.status,
        signal: result.signal?.toString(),
    };
}


export type RunAsyncCommandResult = {
    stdin : Writable,
    stdout : Readable,
    stderr : Readable,
    promise : Promise<[ number, string ]>
}

export async function runAsyncCommand (
    command : string,
    args : string[],
    timeout : number = 2_000
) : Promise<RunAsyncCommandResult>
{
    const child = childProcess.spawn(
        '../node_modules/.bin/devphase',
        [
            command,
            ...args
        ],
        {
            cwd: CONTEXT_PATH,
            timeout,
        }
    );
    
    const [ stdin, stdout, stderr ] = child.stdio;
    stdout.setEncoding('utf-8');
    stderr.setEncoding('utf-8');
    
    return {
        stdin,
        stdout,
        stderr,
        promise: new Promise(resolve => {
            child.once('close', (ret, signal) => {
                resolve([ ret, signal ]);
            });
        })
    };
}
