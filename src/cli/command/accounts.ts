import { RunMode } from '@/def';
import { AccountManager } from '@/service/project/AccountManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import { Command } from 'commander';
import { table } from 'table';


async function commandMain (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Accounts');
    logger.log('Use subcommands');
}

async function commandList (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Accounts');
    
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const accountManager = new AccountManager(runtimeContext);
    
    const accountsKeyrings = await accountManager.loadAccountsKeyringsFromStorageFile();
    const accounts = await accountManager.loadAccounts(
        accountsKeyrings,
        runtimeContext.config.general.ss58Format,
        false
    );
    
    
    const tableData = [
        [
            chalk.bold.white('Alias'),
            chalk.bold.white('Address'),
            chalk.bold.white('Protection'),
        ]
    ];
    
    for (const [ alias, account ] of Object.entries(accounts)) {
        tableData.push([
            chalk.cyan(alias),
            account.address,
            account.isLocked ? chalk.green('Password') : chalk.yellow('Unprotected')
        ]);
    }
    
    logger.log('List of accounts');
    console.log(table(tableData));
}

async function commandCreate (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Accounts');
    
    await runtimeContext.initContext(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const accountManager = new AccountManager(runtimeContext);
    
    const accountsKeyrings = await accountManager.loadAccountsKeyringsFromStorageFile();
    const accounts = await accountManager.loadAccounts(
        accountsKeyrings,
        runtimeContext.config.general.ss58Format,
        false
    );
    
    const account = await accountManager.createAccount(
        runtimeContext.config.general.ss58Format
    );
    
    logger.log('Created account');
    console.log(chalk.cyan(account.alias));
    console.log(account.keyring.address);
}


export function accountsCommand (
    program : Command,
    context : RuntimeContext
)
{
    const mainCommand = program.command('account')
        .description('Accounts management')
        .action(() => commandMain(context))
    ;
    
    mainCommand.command('list')
        .description('Display accounts list')
        .action(() => commandList(context))
    ;
    
    mainCommand.command('create')
        .description('Create new account')
        .action(() => commandCreate(context))
    ;
}
