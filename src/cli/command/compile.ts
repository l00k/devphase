import { CompileOptions, ContractCompiler } from '@/service/ContractCompiler';
import { RuntimeContext } from '@/service/RuntimeContext';
import { Logger } from '@/utils/Logger';
import { Command } from 'commander';


async function command (
    runtimeContext : RuntimeContext,
    contractName? : string,
    options? : CompileOptions
)
{
    const logger = new Logger('Compile');
    
    logger.log('Contracts compilation');
    
    const contractCompiler = new ContractCompiler(runtimeContext);
    
    console.log(options);
    
    return contractCompiler.compileAll(
        contractName,
        options
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
        .option('-r, --release', 'Compile in release mode', false)
        .action(async(...args : any[]) => command(context, ...args));
}
