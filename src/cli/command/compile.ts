import { RuntimeContext } from '@/service/RuntimeContext';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import { Command } from 'commander';


async function command (
    runtimeContext : RuntimeContext,
    contractName? : string
)
{
    const logger = new Logger('Compile')
    
    logger.log('Contracts compilation');
    
    if (contractName) {
        logger.log('Criteria:', chalk.cyan(contractName));
    }
    else {
        logger.log('Criteria:', chalk.yellow('any'));
    }
    
    // match contracts
    const matchedContracts : string[] = [];
}

export function compileCommand (
    program : Command,
    context : RuntimeContext
)
{
    program.command('compile')
        .description('Compile contract(s)')
        .argument('[contractName]', 'Optional name of contract to compile', null)
        .action(async(...args : any[]) => command(context, ...args));
}
