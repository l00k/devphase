import { BaseCommand } from '@/base/BaseCommand';
import { DevPhase, RunMode, RuntimeContext, StackSetupMode, StackSetupService } from '@devphase/service';
import { Flags } from '@oclif/core';
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
        setupMode: Flags.string({
            summary: 'Stack setup mode',
            char: 'm',
            default: StackSetupMode.WithLogger.toString(),
            options: Object.values(StackSetupMode).map(m => m.toString()),
        })
    };
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const devPhase = await DevPhase.create(
            this.runtimeContext,
            this.flags.network
        );
        
        const stackSetupService = new StackSetupService(devPhase);
        
        const result = await stackSetupService.setupStack({
            ...this.runtimeContext.config.stack.setupOptions,
            mode: Number(this.flags.setupMode),
        });
        
        
        this._logger.info(chalk.green('Stack is ready'));
        this._logger.log(chalk.blue('Cluster Id'));
        this._logger.log(result.clusterId);
        
        await devPhase.cleanup();
        
        return result;
    }
    
}
