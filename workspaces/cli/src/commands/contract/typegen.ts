import { BaseCommand } from '@/base/BaseCommand';
import { RunMode, TypeBinder } from '@devphase/service';
import { Flags } from '@oclif/core';


export class ContractTypegenCommand
    extends BaseCommand<typeof ContractTypegenCommand>
{
    
    public static summary : string = 'Generate type bindings for compiled contract';
    
    public static flags = {
        contract: Flags.string({
            summary: 'Contract name',
            char: 'c',
            required: true,
        })
    };
    
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const binder = new TypeBinder(this.runtimeContext);
        const result = await binder.createBindings(this.flags.contract);
        
        return { result };
    }
    
}
