import { Compiler } from '@/service/project/Compiler';
import { MultiContractExecutor } from '@/service/project/MultiContractExecutor';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { TypeBinder } from '@/service/project/TypeBinder';
import { Logger } from '@/utils/Logger';
import { Command } from 'commander';


type CommandOptions = {
    watch : boolean,
    release : boolean,
}

async function command (
    runtimeContext : RuntimeContext,
    contractName? : string,
    options? : CommandOptions
)
{
    const logger = new Logger('Compile');
    
    logger.log('Contracts compilation');
    
    const contractCompiler = new Compiler(runtimeContext);
    const typeBinder = new TypeBinder(runtimeContext);
    const multiContractExecutor = new MultiContractExecutor(runtimeContext);
    
    return multiContractExecutor.exec(
        contractName,
        options.watch,
        async(contractName) => {
            // compile
            const result = await contractCompiler.compile(
                contractName,
                options.release
            );
            if (!result) {
                return false;
            }
            
            // generate typing binding
            return typeBinder.createBindings(contractName);
        }
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
