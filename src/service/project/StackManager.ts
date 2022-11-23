import { ComponentName, RunMode, StackComponentOptions } from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import { serializeProcessArgs } from '@/utils/serializeProcessArgs';
import { timeout } from '@/utils/timeout';
import chalk from 'chalk';
import childProcess, { ChildProcess, SpawnOptions } from 'child_process';
import fs from 'fs';
import cloneDeep from 'lodash/cloneDeep';
import path from 'path';


export class StackManager
{
    
    protected _logger : Logger = new Logger(StackManager.name);
    
    protected _processes : Record<ComponentName, ChildProcess>;
    protected _killFlag : boolean = false;
    protected _runLogsPath : string;
    
    
    public constructor (
        protected _context : RuntimeContext
    )
    {
        this._runLogsPath = this._context.paths.currentLog;
    }
    
    
    public async startStack (runMode : RunMode) : Promise<Record<ComponentName, ChildProcess>>
    {
        if (this._processes) {
            throw new Exception(
                'Stack processes already started',
                1666229698364
            );
        }
        
        // prepare logs directory if required
        if (this.isLogOutputUsed(runMode, this._context)) {
            fs.mkdirSync(this._runLogsPath, { recursive: true });
        }
        
        this._processes = {
            node: null,
            pruntime: null,
            pherry: null,
        };
        
        this._processes.node = await this.startNode(runMode);
        if (this._killFlag) {
            return this._processes;
        }
        
        this._processes.pruntime = await this.startPruntime(runMode);
        if (this._killFlag) {
            return this._processes;
        }
        
        this._processes.pherry = await this.startPherry(runMode);
        
        return this._processes;
    }
    
    public async stopStack (
        force : boolean = false
    )
    {
        this._killFlag = true;
        
        if (!this._processes) {
            throw new Exception(
                'Stack was not started yet',
                1666229971488
            );
        }
        
        const signal = force
            ? 'SIGKILL'
            : 'SIGTERM'
        ;
        
        if (!this._processes.pherry?.killed) {
            this._processes.pherry?.kill(signal);
        }
        
        if (!this._processes.pruntime?.killed) {
            this._processes.pruntime?.kill(signal);
        }
        
        if (!this._processes.node?.killed) {
            this._processes.node?.kill(signal);
        }
    }
    
    public async startNode (runMode : RunMode) : Promise<ChildProcess>
    {
        const options : StackComponentOptions = cloneDeep(this._context.config.stack.node);
        
        return this.startComponent(
            'node',
            options,
            runMode,
            text => text.includes('Running JSON-RPC'),
            text => text.toLowerCase().includes('error'),
        );
    }
    
    public async startPruntime (runMode : RunMode) : Promise<ChildProcess>
    {
        const options : StackComponentOptions = cloneDeep(this._context.config.stack.pruntime);
        
        return this.startComponent(
            'pruntime',
            options,
            runMode,
            text => text.includes('Rocket has launched from'),
            text => text.toLowerCase().includes('error'),
        );
    }
    
    public async startPherry (runMode : RunMode) : Promise<ChildProcess>
    {
        const options : StackComponentOptions = cloneDeep(this._context.config.stack.pherry);
        
        return this.startComponent(
            'pherry',
            options,
            runMode,
            text => text.includes('pRuntime get_info response: PhactoryInfo'),
            text => text.toLowerCase().includes('error'),
        );
    }
    
    
    public async startComponent (
        componentName : string,
        options : StackComponentOptions,
        runMode : RunMode,
        waitForReady : (text : string) => boolean = () => true,
        waitForError : (text : string) => boolean = () => false,
    ) : Promise<ChildProcess>
    {
        // prepare paths and working directory
        const binaryPath = this.getComponentPath(options.binary);
        
        const workingDirPath = this.getComponentPath(options.workingDir);
        if (fs.existsSync(workingDirPath)) {
            fs.rmSync(workingDirPath, { recursive: true, force: true });
        }
        
        fs.mkdirSync(workingDirPath, { recursive: true });
        
        // prepare args
        const spawnOptions : SpawnOptions = {
            cwd: workingDirPath,
            env: {
                ...process.env,
                ...options.envs,
            },
            stdio: [ 'ignore', 'pipe', 'pipe' ]
        };
        
        // wait for process to be ready
        const binaryName = path.basename(binaryPath);
        this._logger.log(
            'Waiting for',
            chalk.cyan(binaryName),
            'to start with',
            (options.timeout / 1000).toFixed(1),
            's timeout.'
        );
        
        // spawn child process
        const child = childProcess.spawn(
            binaryPath,
            serializeProcessArgs(options.args),
            spawnOptions
        );
        
        const [ stdin, stdout, stderr ] = child.stdio;
        stdout.setEncoding('utf-8');
        stderr.setEncoding('utf-8');
        
        // pipe output to file
        let logFileDscr : number;
        if (this.isLogOutputUsed(runMode, this._context)) {
            const logFilePath = path.join(
                this._runLogsPath,
                `${componentName}.log`
            );
            logFileDscr = fs.openSync(logFilePath, 'a');
            
            child.on('close', () => {
                fs.closeSync(logFileDscr);
            });
        }
        
        let settled : boolean = false;
        
        await timeout(() => {
            return new Promise((resolve, reject) => {
                // prepare kill procedure
                const interval = setInterval(() => {
                    if (this._killFlag) {
                        child.kill('SIGKILL');
                        cleanup();
                        
                        reject(
                            new Exception(
                                'Component killed',
                                1667576698031
                            )
                        );
                    }
                }, 250);
                
                const cleanup = () => {
                    settled = true;
                    clearInterval(interval);
                };
                
                const watchFn = (chunk) => {
                    const text = chunk.toString();
                    
                    if (runMode === RunMode.Simple) {
                        console.log(chalk.blueBright(`[${binaryName}]`));
                        process.stdout.write(text);
                    }
                    else if (this.isLogOutputUsed(runMode, this._context)) {
                        fs.appendFileSync(
                            logFileDscr,
                            text,
                            { encoding: 'utf-8' }
                        );
                    }
                    
                    if (!settled) {
                        if (waitForReady(text)) {
                            this._logger.log('Binary', chalk.cyan(binaryName), 'started');
                            
                            cleanup();
                            resolve(child);
                        }
                        else if (waitForError(text)) {
                            cleanup();
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
    
    public getComponentPath (_path : string) : string
    {
        return path.resolve(
            this._context.paths.project,
            _path
        );
    }
    
    public isLogOutputUsed (
        runMode : RunMode,
        context : RuntimeContext
    ) : boolean
    {
        return runMode === RunMode.Testing
            && context.config.testing.stackLogOutput
        ;
    }
    
}
