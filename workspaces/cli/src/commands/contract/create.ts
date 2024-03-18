import { BaseCommand } from '@/base/BaseCommand';
import { ContractManager, RunMode } from '@devphase/service';
import { Flags } from '@oclif/core';


export class ContractCreateCommand
    extends BaseCommand<typeof ContractCreateCommand>
{
    
    public static summary : string = 'Creates new contract from template';
    
    public static flags = {
        name: Flags.string({
            summary: 'Contract name',
            char: 'n',
            required: true,
        }),
        template: Flags.string({
            summary: 'Template name',
            char: 't',
            options: [
                'flipper',
                'http_client',
                'phat_hello',
                'phat_storage',
                'signing',
                'use_cache',
                'vrf'
            ],
            default: 'flipper',
        })
    };
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const contractManager = new ContractManager(this.runtimeContext);
        return await contractManager.createNew(this.flags);
    }
    
}
