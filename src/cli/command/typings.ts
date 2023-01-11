import { RunMode } from '@/def';
import { MultiContractExecutor } from '@/service/project/MultiContractExecutor';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { TypeBinder } from '@/service/project/TypeBinder';
import { Logger } from '@/utils/Logger';
import { Command } from 'commander';


type CommandOptions = {
    watch : boolean,
}


async function command (
    runtimeContext : RuntimeContext,
    contractName? : string,
    options? : CommandOptions
) : Promise<any>
{
    const logger = new Logger('Typings');
    
    logger.log('Starting');
    
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const binder = new TypeBinder(runtimeContext);
    const multiContractExecutor = new MultiContractExecutor(runtimeContext);
    
    return multiContractExecutor.exec(
        contractName,
        options.watch,
        (contractName) => {
            return binder.createBindings(contractName);
        }
    );
    
    return binder.createBindings(contractName);
}

export function typeBindingsCommand (
    program : Command,
    context : RuntimeContext
)
{
    program.command('typings')
        .description('Create type bindings for contracts')
        .argument('[contractName]', 'Optional name of contract to compile', null)
        .option('-w, --watch', 'Watch for changes', false)
        .action(async(...args : any[]) => command(context, ...args));
}
