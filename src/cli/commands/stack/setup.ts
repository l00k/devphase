import { RunMode } from '@/def';
import { DevPhase } from '@/service/api/DevPhase';
import { StackSetupService } from '@/service/api/StackSetupService';
import { BaseCommand } from '@/service/BaseCommand';
import { Flags, ux } from '@oclif/core';
import chalk from 'chalk';


export class StackSetupCommand
    extends BaseCommand<typeof StackSetupCommand>
{
    
    public static summary : string = 'Setup external stack';
    
    public static flags = {
        network: Flags.string({
            summary: 'Network key',
            char: 'n',
            default: 'local'
        }),
    };
    
    public async run ()
    {
        ux.action.start('Setup');
        
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const devPhase = await DevPhase.create(
            this.runtimeContext,
            this.flags.network
        );
        
        const stackSetupService = new StackSetupService(devPhase);
        await stackSetupService.setupStack(this.runtimeContext.config.stack.setupOptions);
        
        await devPhase.cleanup();
        
        ux.action.stop();
        
        ux.debug(chalk.green('Stack is ready'));
        
    }
    
}
