import { Context } from '@/cli/Context';
import { startPherry, startPruntime, startStack, StartStackMode } from '@/cli/stack';
import { Command } from 'commander';


async function command (context : Context)
{
    context.logger.log('Starting stack');
    
    const processes = await startStack(context, StartStackMode.Foreground);
    
    process.on('SIGINT', () => {
        context.logger.log('Got SIGINT - shutting down');
        
        if (!processes.node.killed) {
            processes.node.kill('SIGINT');
        }
        if (!processes.pruntime.killed) {
            processes.pruntime.kill('SIGINT');
        }
        if (!processes.pherry.killed) {
            processes.pherry.kill('SIGINT');
        }
    })
}

export function stackCommand (
    program : Command,
    context : Context
) {
    program.command('stack')
        .description('Start Phala stack')
        .action(async() => command(context));
}
