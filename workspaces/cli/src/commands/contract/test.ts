import { BaseCommand } from '@/base/BaseCommand';
import { RunMode, RuntimeContext, StackSetupMode, Tester } from '@devphase/service';
import { Flags } from '@oclif/core';


export class ContractTestCommand
    extends BaseCommand<typeof ContractTestCommand>
{
    
    public static summary : string = 'Run tests for specified contract(s)';
    
    public static flags = {
        suite: Flags.string({
            summary: 'Test suite name (directory in tests)',
            char: 't',
        }),
        network: Flags.string({
            summary: 'Network key',
            char: 'n',
            default: RuntimeContext.NETWORK_LOCAL,
        }),
        externalStack: Flags.boolean({
            summary: 'Don\'t spawn local stack (use external)',
            char: 'e',
            default: false,
        }),
        stackSetupMode: Flags.string({
            summary: 'Stack setup mode',
            char: 'm',
            options: Object.values(StackSetupMode).map(m => m.toString()),
            default: StackSetupMode.Minimal.toString(),
        })
    };
    
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Testing);
        await this.runtimeContext.requestProjectDirectory();
        
        if (!this.flags.externalStack) {
            await this.runtimeContext.requestStackBinaries();
        }
        
        const tester = new Tester(this.runtimeContext);
        return tester.runTests({
            suite: this.flags.suite,
            network: this.flags.network,
            spawnStack: !this.flags.externalStack,
            stackSetupMode: <any>this.flags.stackSetupMode,
        });
    }
    
}
