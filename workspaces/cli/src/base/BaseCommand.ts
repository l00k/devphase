import { getClassesFromChain } from '@/utils/getClassesFromChain';
import { Logger } from '@/utils/Logger';
import { RuntimeContext, VerbosityLevel } from '@devphase/service';
import { Args, Command, Config, Flags, Interfaces, ux } from '@oclif/core';
import { FlagProps } from '@oclif/core/lib/interfaces/parser';


export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['baseFlags'] & T['flags']>
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>


export abstract class BaseCommand<T extends typeof Command>
    extends Command
{
    
    public static enableJsonFlag = true;
    
    public static flags : Record<string, FlagProps & any> = {
        json: Flags.boolean({
            summary: 'Output in JSON format'
        }),
        silent: Flags.boolean({
            char: 's',
            summary: 'No output',
            exclusive: [
                'verbose'
            ],
        }),
        verbose: Flags.boolean({
            char: 'v',
            summary: 'Verbose output',
            exclusive: [
                'silent'
            ],
        }),
    };
    
    protected _logger : Logger = new Logger('StackRun');
    
    
    protected flags : Flags<T>;
    protected args : Args<T>;
    protected argsRaw : any[] = [];
    
    protected runtimeContext : RuntimeContext;
    
    
    public constructor (argv : string[], config : Config)
    {
        super(argv, config);
        
        this._logger = new Logger(this.constructor.name.replace('Command', ''));
    }
    
    public async init () : Promise<void>
    {
        await super.init();
        
        let parents : (typeof Command)[] = <any>getClassesFromChain(this.ctor)
            .reverse()
            .slice(1);
        
        for (const parentCtor of parents) {
            this.ctor.flags = {
                ...parentCtor.flags,
                ...this.ctor.flags,
            };
        }
        
        const { flags } = await this.parse(this.ctor);
        this.flags = <any>flags;
        
        const { args, raw } = await this.parse(this.ctor);
        this.args = <any>args;
        this.argsRaw = Object.values(raw)
            .filter(arg => arg.type === 'arg')
            .map(arg => arg.input)
        ;
        
        let verbosity = VerbosityLevel.Default;
        if (this.flags?.verbose) {
            verbosity = VerbosityLevel.Verbose;
        }
        else if (this.flags?.silent) {
            verbosity = VerbosityLevel.Silent;
        }
        
        Logger.LOGGER_LEVEL = verbosity;
        
        ux.config.outputLevel = 'debug';
        if (verbosity == VerbosityLevel.Silent) {
            ux.config.action.std = 'stderr';
            ux.config.outputLevel = 'fatal';
        }
        
        this.runtimeContext = await RuntimeContext.getSingleton();
        this.runtimeContext.setVerbosityLevel(verbosity);
    }
    
    public async run () : Promise<void | Record<string, any>>
    {
        return {};
    }
    
    public async catch (error)
    {
        if (this.flags?.verbose) {
            console.trace(error);
        }
    
        throw error;
    }
    
}
