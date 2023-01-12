import { RunMode } from '@/def';
import { DevPhase } from '@/service/api/DevPhase';
import { StackSetupService } from '@/service/api/StackSetupService';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import { Command } from 'commander';

type StackSetupOptions = {
    network? : string,
}

async function command (
    runtimeContext : RuntimeContext,
    options : StackSetupOptions
)
{
    const logger = new Logger('StackSetup');
    
    logger.log('Setup started');
    
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const devPhase = await DevPhase.create(runtimeContext, options.network);
    
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
        .option('-n, --network <network>', 'Network key', 'local')
        .action((options) => command(context, options));
}
