import { BaseCommand } from '@/base/BaseCommand';
import { RunMode, RuntimeContext, StackSetupMode, Tester } from '@devphase/service';
import { Flags } from '@oclif/core';


export class ContractTestCommand
    extends BaseCommand<typeof ContractTestCommand>
{
    
    public static summary : string = 'Run tests for specified contract(s)';
    
    public static flags = {
        suite: Flags.string({
            summary: 'Test suite name (directory)',
            char: 's',
        }),
        network: Flags.string({
            summary: 'Network key',
            char: 'n',
            default: RuntimeContext.NETWORK_LOCAL,
        }),
        setupMode: Flags.string({
            summary: 'Stack setup mode',
            char: 'm',
            default: StackSetupMode.Minimal.toString(),
            options: Object.values(StackSetupMode).map(m => m.toString()),
        })
    };
    
    
    public async run ()
    {
        await this.runtimeContext.initContext(
            RunMode.Testing,
            this.flags.network
        );
        await this.runtimeContext.requestProjectDirectory();
        await this.runtimeContext.requestStackBinaries();
        
        const tester = new Tester(this.runtimeContext);
        return tester.runTests(<any>this.flags);
    }
    
}
