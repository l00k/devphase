import { Context } from '@/Context';
import { StartStackMode } from '@/def';
import { Command } from 'commander';


async function command (context : Context)
{
    context.logger.log('Starting stack');
    
    try {
        const processes = await context.startStack(StartStackMode.Foreground);
    }
    catch (e) {
        await context.stopStack();
        
        throw e;
    }
    
    process.on('SIGINT', async() => {
        context.logger.log('Got SIGINT - shutting down');
        
        await context.stopStack();
    });
}

export function stackCommand (
    program : Command,
    context : Context
)
{
    program.command('stack')
        .description('Start Phala stack')
        .action(async() => command(context));
}
