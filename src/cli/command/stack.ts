import { RunMode } from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { StackManager } from '@/service/project/StackManager';
import { Logger } from '@/utils/Logger';
import { Command } from 'commander';


async function command (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Stack');
    
    logger.log('Starting');
    
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    await runtimeContext.requestStackBinaries();
    
    const stackManager = new StackManager(runtimeContext);
    
    try {
        await stackManager.startStack(RunMode.Simple);
    }
    catch (e) {
        await stackManager.stopStack();
        throw e;
    }
    
    process.on('SIGINT', async() => {
        logger.log('Got SIGINT - shutting down');
        
        await stackManager.stopStack();
    });
}

export function stackCommand (
    program : Command,
    context : RuntimeContext
)
{
    program.command('stack')
        .description('Start Phala stack')
        .action(async() => command(context));
}
