import { ContractCompiler } from '@/service/ContractCompiler';
import { RuntimeContext } from '@/service/RuntimeContext';
import { Logger } from '@/utils/Logger';
import { Command } from 'commander';


type CompileCommandOptions = {
    watch: boolean,
}


async function command (
    runtimeContext : RuntimeContext,
    contractName? : string,
    options? : CompileCommandOptions
)
{
    const logger = new Logger('Compile');
    
    logger.log('Contracts compilation');
    
    const contractCompiler = new ContractCompiler(runtimeContext);
    
    return contractCompiler.compileAll(
        contractName,
        options.watch
    );
}

export function compileCommand (
    program : Command,
    context : RuntimeContext
)
{
    program.command('compile')
        .description('Compile contract(s)')
        .argument('[contractName]', 'Optional name of contract to compile', null)
        .option('-w, --watch', 'Watch for changes', false)
        .action(async(...args : any[]) => command(context, ...args));
}
