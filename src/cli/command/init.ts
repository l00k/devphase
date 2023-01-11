import { RunMode } from '@/def';
import { Initializer } from '@/service/project/Initializer';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import { Command } from 'commander';


async function command (
    runtimeContext : RuntimeContext
)
{
    const logger = new Logger('Init');
    
    logger.log('Initiation');
    
    await runtimeContext.initContext(RunMode.Simple);
    
    const initializer = new Initializer(runtimeContext);
    await initializer.init();
}

export function initCommand (
    program : Command,
    context : RuntimeContext
)
{
    program.command('init')
        .description('Initialize project')
        .action(async() => command(context));
}
