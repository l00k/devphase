import { ProjectConfig, RecursivePartial, RunMode, RuntimeContext } from '@devphase/service';
import { Exception } from '@devphase/service/dist/utils/Exception';
import { TimeoutOptions } from '@devphase/service/dist/utils/timeout';
import chalk from 'chalk';
import childProcess, { ChildProcessWithoutNullStreams } from 'child_process';
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


export function timeout (
    callback : () => Promise<any>,
    timeLimit : number
)
{
    return new Promise(async(resolve, reject) => {
        const _timeout = setTimeout(
            () => reject('Timeouted'),
            timeLimit
        );
        
        try {
            const result = await callback();
            
            clearTimeout(_timeout);
            resolve(result);
        }
        catch (e) {
            clearTimeout(_timeout);
            reject(e);
        }
    });
}

export async function sleep<T> (
    time : number
) : Promise<T>
{
    return new Promise(resolve => setTimeout(resolve, time));
}


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


export type RunCommandOptions = {
    timeout? : number,
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
    options : RunCommandOptions = {}
) : Promise<RunCommandResult>
{
    options = {
        timeout: 2_000,
        ...options
    };
    
    const result = childProcess.spawnSync(
        '../node_modules/.bin/devphase',
        [
            ...command.split(' '),
            ...args
        ],
        {
            cwd: CONTEXT_PATH,
            timeout: options.timeout,
        }
    );
    
    return {
        stdout: result.stdout.toString('utf-8'),
        stderr: result.stderr.toString('utf-8'),
        status: result.status,
        signal: result.signal?.toString(),
    };
}


export type RunAsyncCommandOptions = {
    timeout? : number,
    waitFor? : (stdout : string, stderr : string) => boolean,
}

export type RunAsyncCommandResult = {
    stdin : Writable,
    stdout : Readable,
    stderr : Readable,
    process : ChildProcessWithoutNullStreams,
    promise : Promise<[ number, string ]>
}

export async function runAsyncCommand (
    command : string,
    args : string[],
    options : RunAsyncCommandOptions = {}
) : Promise<RunAsyncCommandResult>
{
    options = {
        timeout: 2_000,
        ...options,
    };
    
    const child = childProcess.spawn(
        '../node_modules/.bin/devphase',
        [
            ...command.split(' '),
            ...args
        ],
        {
            cwd: CONTEXT_PATH,
        }
    );
    
    const [ stdin, stdout, stderr ] = child.stdio;
    stdout.setEncoding('utf-8');
    stderr.setEncoding('utf-8');
    
    if (options.waitFor) {
        await timeout(() => new Promise(resolve => {
            stdout.on('data', txt => {
                if (options.waitFor(txt, undefined)) {
                    resolve(true);
                }
            });
            stderr.on('data', txt => {
                if (options.waitFor(undefined, txt)) {
                    resolve(true);
                }
            });
        }), options.timeout);
    }
    
    return {
        stdin,
        stdout,
        stderr,
        process: child,
        promise: new Promise(resolve => {
            child.once('close', (ret, signal) => {
                resolve([ ret, signal ]);
            });
        })
    };
}
