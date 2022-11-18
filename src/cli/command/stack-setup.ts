import { DevPhase } from '@/service/api/DevPhase';
import { StackSetupService } from '@/service/api/StackSetupService';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import { Command } from 'commander';


async function command (runtimeContext : RuntimeContext)
{
    const logger = new Logger('StackSetup');
    
    logger.log('Setup started');
    
    runtimeContext.requestProjectDirectory();
    
    const devPhase = await DevPhase.create(
        runtimeContext.config.devPhaseOptions,
        runtimeContext
    );
    
    const stackSetupService = new StackSetupService(devPhase);
    await stackSetupService.setupStack(runtimeContext.config.stack.setupOptions);
    
    await devPhase.cleanup();
    
    logger.info('Stack is ready');
}

export function stackSetupCommand (
    program : Command,
    context : RuntimeContext
)
{
    program.command('stack:setup')
        .description('Setup Phala stack')
        .action(async() => command(context));
}
