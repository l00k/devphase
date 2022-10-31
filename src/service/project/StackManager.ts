import { BinarySpawnOptions, ComponentName, SpawnMode } from '@/def';
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
    
    protected static readonly STACK_DIR = 'phala-dev-stack';
    
    protected _logger : Logger = new Logger('StackManager');
    
    
    public constructor (
        protected _context : RuntimeContext
    )
    {}
    
    
    public async startStack (
        mode : SpawnMode = SpawnMode.Background
    ) : Promise<Record<ComponentName, ChildProcess>>
    {
        if (this._context.processes) {
            throw new Exception(
                'Stack processes already started',
                1666229698364
            );
        }
        
        this._context.processes = {
            node: null,
            pruntime: null,
            pherry: null,
        };
        
        this._context.processes.node = await this.startNode(mode);
        this._context.processes.pruntime = await this.startPruntime(mode);
        this._context.processes.pherry = await this.startPherry(mode);
        
        return this._context.processes;
    }
    
    public async stopStack (
        force : boolean = false
    )
    {
        if (!this._context.processes) {
            throw new Exception(
                'Stack was not started yet',
                1666229971488
            );
        }
        
        const signal = force
            ? 'SIGKILL'
            : 'SIGTERM'
        ;
        
        if (!this._context.processes.pherry?.killed) {
            this._context.processes.pherry?.kill(signal);
        }
        
        if (!this._context.processes.pruntime?.killed) {
            this._context.processes.pruntime?.kill(signal);
        }
        
        if (!this._context.processes.node?.killed) {
            this._context.processes.node?.kill(signal);
        }
    }
    
    public async startNode (
        mode : SpawnMode = SpawnMode.Background
    ) : Promise<ChildProcess>
    {
        const options : BinarySpawnOptions = cloneDeep(this._context.config.stack.node);
        if (mode === SpawnMode.Background) {
            options.args['--block-millisecs'] = 100;
        }
        
        return this._startComponent(
            'node',
            options,
            mode,
            text => text.includes('Running JSON-RPC'),
            text => text.toLowerCase().includes('error'),
        );
    }
    
    public async startPruntime (
        mode : SpawnMode = SpawnMode.Background
    ) : Promise<ChildProcess>
    {
        const options : BinarySpawnOptions = cloneDeep(this._context.config.stack.pruntime);
        
        return this._startComponent(
            'pruntime',
            options,
            mode,
            text => text.includes('Rocket has launched from'),
            text => text.toLowerCase().includes('error'),
        );
    }
    
    public async startPherry (
        mode : SpawnMode = SpawnMode.Background
    ) : Promise<ChildProcess>
    {
        const options : BinarySpawnOptions = cloneDeep(this._context.config.stack.pherry);
        if (mode === SpawnMode.Background) {
            options.args['--dev-wait-block-ms'] = 100;
        }
        
        return this._startComponent(
            'pherry',
            options,
            mode,
            text => text.includes('pRuntime get_info response: PhactoryInfo'),
            text => text.toLowerCase().includes('error'),
        );
    }
    
    
    protected async _startComponent (
        componentName : ComponentName,
        options : BinarySpawnOptions,
        mode : SpawnMode,
        waitForReady : (text : string) => boolean = () => true,
        waitForError : (text : string) => boolean = () => false,
    ) : Promise<ChildProcess>
    {
        // prepare directories
        const workingDirPath = path.join(this._context.libPath, StackManager.STACK_DIR, '.data', componentName);
        if (fs.existsSync(workingDirPath)) {
            fs.rmSync(workingDirPath, { recursive: true, force: true });
        }
        
        fs.mkdirSync(workingDirPath, { recursive: true });
        
        // prepare args
        const binaryPath = path.join(this._context.libPath, StackManager.STACK_DIR, 'bin', componentName);
        
        return this._spawnBinary(
            binaryPath,
            workingDirPath,
            options,
            mode,
            waitForReady,
            waitForError
        );
    }
    
    
    protected async _spawnBinary (
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
                        console.log(chalk.blueBright(`[${binaryName}]`));
                        process.stdout.write(text);
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
