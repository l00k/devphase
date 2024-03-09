import {
    ComponentName,
    NodeComponentOptions,
    PherryComponentOptions,
    PruntimeComponentOptions,
    RunMode,
    StackComponentOptions,
    StartStackOptions,
    VerbosityLevel
} from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import { serializeProcessArgs } from '@/utils/serializeProcessArgs';
import { timeout } from '@/utils/timeout';
import chalk from 'chalk';
import childProcess, { ChildProcess, SpawnOptions } from 'child_process';
import fs from 'fs';
import Listr from 'listr';
import cloneDeep from 'lodash/cloneDeep';
import path from 'path';


export class StackManager
{
    
    protected _logger : Logger = new Logger('StackManager');
    
    protected _processes : Record<ComponentName, ChildProcess>;
    protected _killFlag : boolean = false;
    protected _runLogsPath : string;
    
    
    public constructor (
        protected _context : RuntimeContext
    )
    {
        this._runLogsPath = this._context.paths.currentLog;
    }
    
    
    public async startStack (
        runMode : RunMode,
        options : StartStackOptions = {}
    ) : Promise<Record<ComponentName, ChildProcess>>
    {
        if (this._processes) {
            throw new Exception(
                'Stack processes already started',
                1666229698364
            );
        }
        
        // get default block time
        const blockTime = runMode == RunMode.Testing
            ? this._context.config.testing.blockTime
            : this._context.config.stack.blockTime
            ;
        
        options = {
            blockTime,
            ...options,
        };
        
        // prepare logs directory if required
        if (options.saveLogs) {
            fs.mkdirSync(this._runLogsPath, { recursive: true });
        }
        
        this._processes = {
            node: null,
            pruntime: null,
            pherry: null,
        };
        
        const version = this._context.config.stack.version;
        this._logger.log(
            'Starting stack',
            chalk.cyan(version)
        );
        
        const listr = new Listr([
            {
                title: 'Start node component',
                task: async() => {
                    this._processes.node = await this.startNode(runMode, options);
                    if (this._killFlag) {
                        throw new Exception(
                            'Stack killed',
                            1675571773657
                        );
                    }
                }
            },
            {
                title: 'Start pRuntime component',
                task: async() => {
                    this._processes.pruntime = await this.startPruntime(runMode, options);
                    if (this._killFlag) {
                        throw new Exception(
                            'Stack killed',
                            1675571821163
                        );
                    }
                }
            },
            {
                title: 'Start pherry component',
                task: async() => {
                    this._processes.pherry = await this.startPherry(runMode, options);
                    if (this._killFlag) {
                        throw new Exception(
                            'Stack killed',
                            1675571845146
                        );
                    }
                }
            }
        ], {
            renderer: this._context.listrRenderer
        });
        
        try {
            await listr.run();
        }
        catch (e : any) {
            await this.stopStack(true);
            
            if (
                e?.message
                && e.message.includes('Stack killed')
            ) {
                return this._processes;
            }
            
            throw e;
        }
        
        return this._processes;
    }
    
    public async stopStack (
        force : boolean = false
    )
    {
        if (this._killFlag) {
            return;
        }
    
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
    
    public async startNode (
        runMode : RunMode,
        stackOptions : StartStackOptions
    ) : Promise<ChildProcess>
    {
        const compOptions : NodeComponentOptions = cloneDeep(this._context.config.stack.node);
        
        compOptions.args['--block-millisecs'] = stackOptions.blockTime;
        
        return this.startComponent(
            'node',
            stackOptions,
            compOptions,
            runMode,
            text => text.includes('Listening for new connections on') || text.includes('Running JSON-RPC'),
            text => text.toLowerCase().includes('error'),
        );
    }
    
    public async startPruntime (
        runMode : RunMode,
        stackOptions : StartStackOptions
    ) : Promise<ChildProcess>
    {
        const compOptions : PruntimeComponentOptions = cloneDeep(this._context.config.stack.pruntime);
        
        return this.startComponent(
            'pruntime',
            stackOptions,
            compOptions,
            runMode,
            text => text.includes('Rocket has launched from'),
            text => text.toLowerCase().includes('error'),
        );
    }
    
    public async startPherry (
        runMode : RunMode,
        stackOptions : StartStackOptions
    ) : Promise<ChildProcess>
    {
        const compOptions : PherryComponentOptions = cloneDeep(this._context.config.stack.pherry);
        
        compOptions.args['--dev-wait-block-ms'] = stackOptions.blockTime;
        
        return this.startComponent(
            'pherry',
            stackOptions,
            compOptions,
            runMode,
            text => text.includes('pRuntime get_info response: PhactoryInfo'),
            text => text.toLowerCase().includes('error'),
        );
    }
    
    
    public async startComponent (
        componentName : string,
        stackOptions : StartStackOptions,
        componentOptions : StackComponentOptions,
        runMode : RunMode,
        waitForReady : (text : string) => boolean = () => true,
        waitForError : (text : string) => boolean = () => false,
    ) : Promise<ChildProcess>
    {
        // prepare paths and working directory
        const binaryPath = this.getComponentPath(componentOptions.binary);
        
        const workingDirPath = this.getComponentPath(componentOptions.workingDir);
        
        const dataDirPath = this.getComponentPath(componentOptions.dataDir);
        if (fs.existsSync(dataDirPath)) {
            fs.rmSync(dataDirPath, { recursive: true, force: true });
        }
        
        fs.mkdirSync(dataDirPath, { recursive: true });
        
        // prepare args
        const spawnOptions : SpawnOptions = {
            cwd: workingDirPath,
            env: {
                ...process.env,
                ...componentOptions.envs,
            },
            stdio: [ 'ignore', 'pipe', 'pipe' ],
        };
        
        // wait for process to be ready
        const binaryName = path.basename(binaryPath);
        
        // spawn child process
        const serializedArgs = serializeProcessArgs(componentOptions.args);
        
        let child : childProcess.ChildProcess;
        try {
            child = childProcess.spawn(
                binaryPath,
                serializedArgs,
                spawnOptions
            );
        }
        catch (e) {
            throw new Exception(
                'Failed to spawn process',
                1698444058865,
                e
            );
        }
        
        const [ stdin, stdout, stderr ] = child.stdio;
        stdout.setEncoding('utf-8');
        stderr.setEncoding('utf-8');
        
        // pipe output to file
        let logFileDscr : number;
        if (stackOptions.saveLogs) {
            const logFilePath = path.join(
                this._runLogsPath,
                `${componentName}.log`
            );
            logFileDscr = fs.openSync(logFilePath, 'a');
            
            child.on('close', () => {
                fs.closeSync(logFileDscr);
            });
        }
        
        const displayLogs = this._context.verbosity == VerbosityLevel.Verbose
            && runMode != RunMode.Testing
        ;
        
        let settled : boolean = false;
        let lastOutputLines : string[] = [];
        
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
                    
                    lastOutputLines.push(...text.split('\n'))
                    lastOutputLines = lastOutputLines.slice(-10);
                    
                    if (displayLogs) {
                        console.log(chalk.blueBright(`[${binaryName}]`));
                        process.stdout.write(text);
                    }
                    if (stackOptions.saveLogs) {
                        fs.appendFileSync(
                            logFileDscr,
                            text,
                            { encoding: 'utf-8' }
                        );
                    }
                    
                    if (!settled) {
                        if (waitForReady(text)) {
                            cleanup();
                            resolve(child);
                        }
                        else if (waitForError(text)) {
                            cleanup();
                            reject(
                                new Exception(
                                    `Failed to start ${binaryName} component.\n${text}`,
                                    1666286544430
                                )
                            );
                        }
                    }
                };
                
                stdout.on('data', watchFn);
                stderr.on('data', watchFn);
                
                child.on('close', (code, signal) => {
                    if (!settled) {
                        // closing before settlement means some error occured
                        reject(
                            new Exception(
                                `Failed to start ${binaryName} component.\n` + lastOutputLines.join('\n'),
                                1698329819579
                            )
                        );
                    }
                });
                
                child.on('exit', () => {
                    this._logger.error(
                        componentName,
                        'exited'
                    );
                    
                    this.stopStack(true);
                });
            });
        }, componentOptions.timeout);
        
        return child;
    }
    
    public getComponentPath (_path : string) : string
    {
        return path.resolve(
            this._context.paths.project,
            _path
        );
    }
    
}
