import { BinarySpawnOptions, SpawnMode } from '@/def';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import { serializeProcessArgs } from '@/utils/serializeProcessArgs';
import { timeout } from '@/utils/timeout';
import chalk from 'chalk';
import childProcess, { ChildProcess, SpawnOptions } from 'child_process';
import path from 'path';


export class BinarySpawner
{
    
    protected _logger : Logger = new Logger('BinarySpawner');
    
    
    public async spawn (
        binaryPath : string,
        workingDirPath : string,
        options : BinarySpawnOptions,
        spawnMode : SpawnMode,
        waitForReady : (text : string) => boolean = () => true,
        waitForError : (text : string) => boolean = () => false,
    ) : Promise<ChildProcess>
    {
        const spawnOptions : SpawnOptions = {
            cwd: workingDirPath,
            env: {
                ...process.env,
                ...options.envs,
            },
            stdio: [ 'ignore', 'pipe', 'pipe' ]
        };
        
        const child = childProcess.spawn(
            binaryPath,
            serializeProcessArgs(options.args),
            spawnOptions
        );
        
        const [ stdin, stdout, stderr ] = child.stdio;
        stdout.setEncoding('utf-8');
        stderr.setEncoding('utf-8');
        
        // wait for process to be ready
        const binaryName = path.basename(binaryPath);
        this._logger.log(
            'Waiting for',
            chalk.cyan(binaryName),
            'to start with',
            (options.timeout / 1000).toFixed(1),
            's timeout.'
        );
        
        let settled : boolean = false;
        
        await timeout(() => {
            return new Promise((resolve, reject) => {
                const watchFn = (chunk) => {
                    const text = chunk.toString();
                    
                    if (spawnMode === SpawnMode.Foreground) {
                        this._logger.log(
                            chalk.blueBright(`[${binaryName}]`),
                            text
                        );
                    }
                    
                    if (!settled) {
                        if (waitForReady(text)) {
                            this._logger.log('Binary', chalk.cyan(binaryName), 'started');
                            settled = true;
                            resolve(child);
                        }
                        else if (waitForError(text)) {
                            settled = true;
                            reject(
                                new Exception(
                                    `Failed to start ${binaryName} component`,
                                    1666286544430
                                )
                            );
                        }
                    }
                };
                
                stdout.on('data', watchFn);
                stderr.on('data', watchFn);
            });
        }, options.timeout);
        
        return child;
    }
    
}
