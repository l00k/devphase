import { RunMode } from '@/def';
import { ContractDefinition, ContractManager } from '@/service/project/ContractManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import { Command } from 'commander';
import { table } from 'table';
import sortBy from 'lodash/sortBy';


async function commandMain (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Contracts');
    logger.log('Use subcommands');
}

async function commandList (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Contracts');
    
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const contractManager = new ContractManager(runtimeContext);
    
    let contractDefinitions : ContractDefinition[] = await contractManager.loadContractsDefFromStorageFile();
    contractDefinitions = sortBy(contractDefinitions, [ 'type', 'network', 'name' ]);
    
    let tableData = [
        [
            chalk.bold.white('Name'),
            chalk.bold.white('Type'),
            chalk.bold.white('Network'),
            chalk.bold.white('Contract Id'),
            chalk.bold.white('Cluster Id'),
        ]
    ];
    
    for (const contractDefinition of contractDefinitions) {
        tableData.push([
            chalk.cyan(contractDefinition.name),
            contractDefinition.type,
            contractDefinition.network,
            contractDefinition.contractId,
            contractDefinition.clusterId,
        ]);
    }
    
    logger.log('List of contracts');
    console.log(table(tableData));
}

async function commandNew (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Contracts');
    
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
}

async function commandDeploy (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Contracts');
    
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
}

async function commandCall (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Contracts');
    
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
}


export function contractsCommand (
    program : Command,
    context : RuntimeContext
)
{
    const mainCommand = program.command('contract')
        .description('Contracts management')
        .action(() => commandMain(context))
    ;
    
    mainCommand.command('list')
        .description('Display contract list')
        .action(() => commandList(context))
    ;
    
    mainCommand.command('new')
        .description('Create new contract')
        .action(() => commandNew(context))
    ;
    
    mainCommand.command('deploy')
        .description('Deploy contract')
        .action(() => commandDeploy(context))
    ;
    
    mainCommand.command('call')
        .description('Call contract method')
        .action(() => commandCall(context))
    ;
}
