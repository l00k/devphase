import { RunMode } from '@/def';
import { BaseCommand } from '@/service/BaseCommand';
import { MultiContractExecutor } from '@/service/project/MultiContractExecutor';
import { TypeBinder } from '@/service/project/TypeBinder';
import { Flags } from '@oclif/core';


export class ContractTypingCommand
    extends BaseCommand<typeof ContractTypingCommand>
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
