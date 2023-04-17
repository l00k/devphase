import { BaseCommand } from '@/base/BaseCommand';
import { ContractManager, RunMode } from '@devphase/service';
import { Flags } from '@oclif/core';


export class ContractValidateCommand
    extends BaseCommand<typeof ContractValidateCommand>
{
    
    public static summary : string = 'Compile contract';
    
    public static flags = {
        contract: Flags.string({
            summary: 'Contract name',
            char: 'c'
        }),
    };
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const contractManager = new ContractManager(this.runtimeContext);
        
        const validation = await contractManager.validate({
            contractName: this.flags.contract
        });
        
        return validation;
    }
    
}
