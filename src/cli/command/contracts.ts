import { RunMode } from '@/def';
import { ContractCreateNewArgs, ContractDefinition, ContractManager } from '@/service/project/ContractManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import { Command } from 'commander';
import { table } from 'table';
import sortBy from 'lodash/sortBy';


async function commandMain (runtimeContext : RuntimeContext)
{
    console.log('Use subcommands');
}

async function commandList (runtimeContext : RuntimeContext)
{
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
    
    console.log('List of contracts');
    console.log(table(tableData));
}

async function commandNew (
    runtimeContext : RuntimeContext,
    contractCreateNewArgs : Partial<ContractCreateNewArgs>
)
{
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const contractManager = new ContractManager(runtimeContext);
    
    await contractManager.createNew(contractCreateNewArgs);
}

async function commandDeploy (runtimeContext : RuntimeContext)
{
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
}

async function commandCall (runtimeContext : RuntimeContext)
{
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
        .option('-n, --name <name>', 'Contract name')
        .action((contractCreateNewArgs : Partial<ContractCreateNewArgs>) => commandNew(context, contractCreateNewArgs))
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
