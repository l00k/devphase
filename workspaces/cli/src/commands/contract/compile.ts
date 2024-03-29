import { BaseCommand } from '@/base/BaseCommand';
import { ContractManager, RunMode } from '@devphase/service';
import { Flags } from '@oclif/core';


export class ContractCompileCommand
    extends BaseCommand<typeof ContractCompileCommand>
{
    
    public static summary : string = 'Compile contract';
    
    public static flags = {
        contract: Flags.string({
            summary: 'Contract name',
            char: 'c'
        }),
        watch: Flags.boolean({
            summary: 'Watch changes',
            char: 'w',
            default: false,
        }),
        release: Flags.boolean({
            summary: 'Compile in release mode',
            char: 'r',
            default: false,
        })
    };
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const contractManager = new ContractManager(this.runtimeContext);
        
        const result = await contractManager.compile({
            contractName: this.flags.contract,
            watch: this.flags.watch,
            release: this.flags.release,
        });
        
        return result;
    }
    
}
