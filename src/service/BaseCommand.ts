import { VerbosityLevel } from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { getClassesFromChain } from '@/utils/getClassesFromChain';
import { Args, Command, Flags, Interfaces, ux } from '@oclif/core';
import { FlagProps } from '@oclif/core/lib/interfaces/parser';
import Listr from 'listr';


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
        verbosity: Flags.string({
            summary: 'Verbosity level',
            char: 'v',
            default: '1',
            options: [ '0', '1', '2' ]
        }),
    };
    
    protected flags : Flags<T>;
    protected args : Args<T>;
    protected argsRaw : any[] = [];
    
    protected runtimeContext : RuntimeContext;
    
    
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
        
        ux.config.outputLevel = 'debug';
        if (
            this.flags.json
            || this.flags.verbosity == VerbosityLevel.Silent
        ) {
            ux.config.action.std = 'stderr';
            ux.config.outputLevel = 'fatal';
        }
        
        this.runtimeContext = await RuntimeContext.getSingleton();
        this.runtimeContext.setVerbosityLevel(this.flags.verbosity);
    }
    
    public async run () : Promise<void | Record<string, any>>
    {
        return {};
    }
    
}
