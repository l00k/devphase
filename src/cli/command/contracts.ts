import { ContractType, RunMode } from '@/def';
import {
    ContractCallOptions,
    ContractCompileOptions,
    ContractCreateNewOptions,
    ContractDefinition,
    ContractDeployOptions,
    ContractManager
} from '@/service/project/ContractManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import chalk from 'chalk';
import { Command } from 'commander';
import sortBy from 'lodash/sortBy';
import { table } from 'table';


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
    createNewOptions : ContractCreateNewOptions
)
{
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const contractManager = new ContractManager(runtimeContext);
    
    await contractManager.createNew(createNewOptions);
}

async function commandCompile (
    runtimeContext : RuntimeContext,
    compileOptions : ContractCompileOptions
)
{
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const contractManager = new ContractManager(runtimeContext);
    
    await contractManager.compile(compileOptions);
}

async function commandDeploy (
    runtimeContext : RuntimeContext,
    contractName : string,
    constructor : string,
    ctorArgs : string[],
    deployOptions : ContractDeployOptions
)
{
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const contractManager = new ContractManager(runtimeContext);
    
    await contractManager.deploy(
        contractName,
        constructor,
        ctorArgs,
        deployOptions
    );
}

async function commandCall (
    runtimeContext : RuntimeContext,
    callOptions : ContractCallOptions
)
{
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const contractManager = new ContractManager(runtimeContext);
    
    await contractManager.contractCall(callOptions);
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
        .action((contractCreateNewOptions : Partial<ContractCreateNewOptions>) => commandNew(context, contractCreateNewOptions))
    ;
    
    mainCommand.command('compile')
        .description('Compile contract(s)')
        .option('-c, --contract <contractName>', 'Optional name of contract(s) to compile')
        .option('-w, --watch', 'Watch for changes', false)
        .option('-r, --release', 'Compile in release mode', false)
        .action((contractCompileOptions : ContractCompileOptions) => commandCompile(context, contractCompileOptions))
    ;
    
    mainCommand.command('deploy')
        .description('Deploy contract')
        .argument('contractName', 'Contract name')
        .argument('constructor', 'Contract constructor')
        .option('-t, --type <contractType>', 'Contract type (InkCode default)')
        .option('-n, --network <network>', 'Target network to deploy (local default)')
        .option('-l, --cluster <network>', 'Target cluster Id')
        .option('-a, --account <account>', 'Account used to deploy')
        .argument('[ctorArgs...]', 'Contract constructor arguments')
        .action((
            contractName : string,
            constructor: string,
            ctorArgs : string[],
            deployOptions : ContractDeployOptions
        ) => {
            return commandDeploy(
                context,
                contractName,
                constructor,
                ctorArgs,
                deployOptions
            );
        })
    ;
    
    mainCommand.command('call')
        .description('Call contract method')
        .option('-c, --contract <contractName>', 'Optional name of contract(s) to compile')
        .action((callOptions : ContractCallOptions) => commandCall(context, callOptions))
    ;
}
