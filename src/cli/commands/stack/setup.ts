import { RunMode } from '@/def';
import { DevPhase } from '@/service/api/DevPhase';
import { StackSetupService } from '@/service/api/StackSetupService';
import { BaseCommand } from '@/service/BaseCommand';
import { RuntimeContext } from '@/service/project/RuntimeContext';
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
            default: RuntimeContext.NETWORK_LOCAL
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
        
        const renderer = this.getListrVerbosity();
        const result = await stackSetupService.setupStack({
            renderer,
            ...this.runtimeContext.config.stack.setupOptions,
        });
        
        if (!this.flags.json) {
            ux.debug(chalk.green('Stack is ready'));
            
            ux.debug(chalk.blue('Cluster Id'));
            ux.debug(result.clusterId);
        }
        
        await devPhase.cleanup();
        
        ux.action.stop();
        
        return result;
    }
    
}
