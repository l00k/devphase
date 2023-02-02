import { RuntimeContext } from '@/service/project/RuntimeContext';
import { getClassesFromChain } from '@/utils/getClassesFromChain';
import { Args, Command, Flags, Interfaces, ux } from '@oclif/core';
import { FlagProps, Input } from '@oclif/core/lib/interfaces/parser';


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
    };
    
    protected flags : Flags<T>;
    protected args : Args<T>;
    
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
        this.flags = <any> flags;
        
        const { args } = await this.parse(this.ctor);
        this.args = <any> args;
        
        ux.config.outputLevel = 'debug';
        if (this.flags.json) {
            ux.config.action.std = 'stderr';
            ux.config.outputLevel = 'fatal';
        }
        
        this.runtimeContext = await RuntimeContext.getSingleton();
    }
    
    public async run () : Promise<void | Record<string, any>>
    {
        return {};
    }
    
}
