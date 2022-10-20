import { Config, StartStackMode } from '@/def';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import childProcess, { ChildProcess, SpawnOptions } from 'child_process';
import findUp from 'find-up';
import path from 'path';


export type StackProcesses = {
    node : ChildProcess,
    pruntime : ChildProcess,
    pherry : ChildProcess,
}

export class Context
{

    protected static readonly SINGLETON_KEY = 'devphase_Context_VSffVql3bvj9aulZY5DNnRCnrEt1V27a';
    
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
        this.config = require(configFilePath).default;
    }
    
    
    public async startStack (
        mode : StartStackMode = StartStackMode.Background
        // todo ld 2022-10-20 03:54:44 - add options
    ) : Promise<StackProcesses>
    {
        if (this.processes) {
            throw new Exception(
                'Stack processes already started',
                1666229698364
            );
        }
        
        this.processes = {
            node: await this.startNode(mode),
            pruntime: await this.startPruntime(mode),
            pherry: await this.startPherry(mode),
        };
        
        return this.processes;
    }
    
    public async stopStack()
    {
        if (!this.processes) {
            throw new Exception(
                'Stack was not started yet',
                1666229971488
            );
        }
        
        if (!this.processes.pherry.killed) {
            this.processes.pherry.kill('SIGTERM');
        }
        if (!this.processes.pruntime.killed) {
            this.processes.pruntime.kill('SIGTERM');
        }
        if (!this.processes.node.killed) {
            this.processes.node.kill('SIGTERM');
        }
    }
    
    public async startNode (
        mode : StartStackMode = StartStackMode.Background
    ) : Promise<ChildProcess>
    {
        // todo ld 2022-10-20 03:45:35 - wait for process to be ready
        return this._startComponent('node', mode);
    }
    
    public async startPruntime (
        mode : StartStackMode = StartStackMode.Background
    ) : Promise<ChildProcess>
    {
        // todo ld 2022-10-20 03:45:35 - wait for process to be ready
        return this._startComponent('pruntime', mode);
    }
    
    public async startPherry (
        mode : StartStackMode = StartStackMode.Background
    ) : Promise<ChildProcess>
    {
        // todo ld 2022-10-20 03:45:35 - wait for process to be ready
        return this._startComponent('pherry', mode);
    }
    
    protected async _startComponent (
        component : string,
        mode : StartStackMode
    ) : Promise<ChildProcess>
    {
        this.logger.log(`Starting ${component} component`);
        
        const workingDir = path.join(this.libPath, 'phala-dev-stack');
        const binPath = path.join(workingDir, 'component-starter.sh');
        
        // todo ld 2022-10-19 18:16:34 - maybe add envs from config?
        const options : SpawnOptions = {
            cwd: workingDir,
            env: process.env,
        };
        
        if (mode === StartStackMode.Foreground) {
            options.stdio = 'inherit';
        }
        
        return childProcess.spawn(
            binPath,
            [ component ],
            options
        );
    }
    
}
