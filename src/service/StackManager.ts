import { BinarySpawner } from '@/service/BinarySpawner';
import { RuntimeContext } from '@/service/RuntimeContext';
import { BinarySpawnOptions, ComponentName, SpawnMode } from '@/def';
import { Exception } from '@/utils/Exception';
import { ChildProcess } from 'child_process';
import fs from 'fs';
import cloneDeep from 'lodash/cloneDeep';
import path from 'path';


export class StackManager
{
    
    protected static readonly STACK_DIR = 'phala-dev-stack';
    
    protected _binarySpawner : BinarySpawner = new BinarySpawner();
    
    
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
        
        return this._binarySpawner.spawn(
            binaryPath,
            workingDirPath,
            options,
            mode,
            waitForReady,
            waitForError
        );
    }
    
}
