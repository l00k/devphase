import { ComponentName, Config, ConfigOption, StartComponentOptions, StartStackMode } from '@/def';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import { replaceRecursive } from '@/utils/replaceRecursive';
import { serializeProcessArgs } from '@/utils/serializeProcessArgs';
import { timeout } from '@/utils/timeout';
import chalk from 'chalk';
import childProcess, { ChildProcess, SpawnOptions } from 'child_process';
import findUp from 'find-up';
import cloneDeep from 'lodash/cloneDeep';
import fs from 'fs';
import path from 'path';


export type StackProcesses = {
    node : ChildProcess,
    pruntime : ChildProcess,
    pherry : ChildProcess,
}

export class Context
{
    
    protected static readonly SINGLETON_KEY = 'devphase_Context_VSffVql3bvj9aulZY5DNnRCnrEt1V27a';
    protected static readonly STACK_DIR = 'phala-dev-stack';
    
    
    public logger : Logger = new Logger('devPHAse CLI', true);
    
    public libPath : string;
    public projectDir : string;
    public config : Config;
    
    public processes : StackProcesses;
    
    
    protected constructor () {}
    
    public static async getSingleton () : Promise<Context>
    {
        const globalAny = global as any;
        
        if (!globalAny[Context.SINGLETON_KEY]) {
            const instance = new Context();
            await instance._init();
            
            globalAny[Context.SINGLETON_KEY] = instance;
        }
        
        return globalAny[Context.SINGLETON_KEY];
    }
    
    protected async _init () : Promise<void>
    {
        const configFilePath = await findUp([
            'devphase.config.ts',
            'devphase.config.js',
        ]);
        if (!configFilePath) {
            throw new Exception(
                'Config file not found',
                1665952724703
            );
        }
        
        this.libPath = __dirname.endsWith('/cli')
            ? path.join(__dirname, '../../')
            : path.join(__dirname, '../');
        
        this.projectDir = path.dirname(configFilePath);
        
        const userConfig = require(configFilePath).default;
        this.config = this._getFallbackConfig(userConfig);
    }
    
    
    public async startStack (
        mode : StartStackMode = StartStackMode.Background
    ) : Promise<StackProcesses>
    {
        if (this.processes) {
            throw new Exception(
                'Stack processes already started',
                1666229698364
            );
        }
        
        this.processes = {
            node: null,
            pruntime: null,
            pherry: null,
        };
        
        this.processes.node = await this.startNode(mode);
        this.processes.pruntime = await this.startPruntime(mode);
        this.processes.pherry = await this.startPherry(mode);
        
        return this.processes;
    }
    
    public async stopStack (force : boolean = false)
    {
        if (!this.processes) {
            throw new Exception(
                'Stack was not started yet',
                1666229971488
            );
        }
        
        const signal = force
            ? 'SIGKILL'
            : 'SIGTERM'
        ;
        
        if (!this.processes.pherry?.killed) {
            this.processes.pherry?.kill(signal);
        }
        
        if (!this.processes.pruntime?.killed) {
            this.processes.pruntime?.kill(signal);
        }
        
        if (!this.processes.node?.killed) {
            this.processes.node?.kill(signal);
        }
    }
    
    public async startNode (
        mode : StartStackMode = StartStackMode.Background
    ) : Promise<ChildProcess>
    {
        const options : StartComponentOptions = cloneDeep(this.config.stack.node);
        if (mode === StartStackMode.Background) {
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
        mode : StartStackMode = StartStackMode.Background
    ) : Promise<ChildProcess>
    {
        const options : StartComponentOptions = cloneDeep(this.config.stack.pruntime);
        
        return this._startComponent(
            'pruntime',
            options,
            mode,
            text => text.includes('Rocket has launched from'),
            text => text.toLowerCase().includes('error'),
        );
    }
    
    public async startPherry (
        mode : StartStackMode = StartStackMode.Background
    ) : Promise<ChildProcess>
    {
        const options : StartComponentOptions = cloneDeep(this.config.stack.pherry);
        if (mode === StartStackMode.Background) {
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
        options : StartComponentOptions,
        mode : StartStackMode,
        waitForReady : (text : string) => boolean = () => true,
        waitForError : (text : string) => boolean = () => false,
    ) : Promise<ChildProcess>
    {
        // prepare directories
        const workingDirPath = path.join(this.libPath, Context.STACK_DIR, '.data', componentName);
        if (fs.existsSync(workingDirPath)) {
            fs.rmSync(workingDirPath, { recursive: true, force: true });
        }
        
        fs.mkdirSync(workingDirPath, { recursive: true });
        
        // prepare args
        const binPath = path.join(this.libPath, Context.STACK_DIR, 'bin', componentName);
        
        const spawnOptions : SpawnOptions = {
            cwd: workingDirPath,
            env: {
                ...process.env,
                ...options.envs,
            },
            stdio: [ 'ignore', 'pipe', 'pipe' ]
        };
        
        const child = childProcess.spawn(
            binPath,
            serializeProcessArgs(options.args),
            spawnOptions
        );
        
        const [ stdin, stdout, stderr ] = child.stdio;
        stdout.setEncoding('utf-8');
        stderr.setEncoding('utf-8');
        
        // wait for process to be ready
        this.logger.log(
            'Waiting for',
            chalk.cyan(componentName),
            'to start with',
            (options.timeout / 1000).toFixed(1),
            's timeout.'
        );
        
        let settled : boolean = false;
        
        await timeout(() => {
            return new Promise((resolve, reject) => {
                const watchFn = (chunk) => {
                    const text = chunk.toString();
                    
                    if (mode === StartStackMode.Foreground) {
                        this.logger.log(
                            chalk.blueBright(`[${componentName}]`),
                            text
                        );
                    }
                    
                    if (!settled) {
                        if (waitForReady(text)) {
                            this.logger.log('Component', chalk.cyan(componentName), 'started');
                            settled = true;
                            resolve(child);
                        }
                        else if (waitForError(text)) {
                            settled = true;
                            reject(
                                new Exception(
                                    `Failed to start ${componentName} component`,
                                    1666286544430
                                )
                            );
                        }
                    }
                }
                
                stdout.on('data', watchFn);
                stderr.on('data', watchFn);
            });
        }, options.timeout);
        
        return child;
    }
    
    protected _getFallbackConfig (options : ConfigOption) : Config
    {
        return replaceRecursive({
            directories: {
                contracts: 'contracts',
                tests: 'tests',
            },
            stack: {
                node: {
                    envs: {},
                    args: {
                        '--dev': true,
                        '--rpc-methods': 'Unsafe',
                        '--block-millisecs': 6000,
                    },
                    timeout: 10000,
                },
                pruntime: {
                    envs: {},
                    args: {
                        '--allow-cors': true,
                        '--cores': 0,
                        '--port': 8000,
                    },
                    timeout: 2000,
                },
                pherry: {
                    envs: {},
                    args: {
                        '--no-wait': true,
                        '--mnemonic': '//Alice',
                        '--inject-key': '0000000000000000000000000000000000000000000000000000000000000001',
                        '--substrate-ws-endpoint': 'ws://localhost:9944',
                        '--pruntime-endpoint': 'http://localhost:8000',
                        '--dev-wait-block-ms': 1000,
                    },
                    timeout: 2000,
                }
            },
            mocha: {}
        }, options);
    }
    
}
