import { RunMode } from '@/def';
import { AccountsManager } from '@/service/project/AccountsManager';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import { Command } from 'commander';


async function commandMain (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Accounts management');
    logger.log('Use subcommands');
}

async function commandList (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Accounts');
    
    await runtimeContext.init(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const accountsManager = new AccountsManager();
    
    const accountsKeyrings = await accountsManager.loadAccountsKeyringsFromConfigFile(runtimeContext);
    const accounts = await accountsManager.loadAccounts(
        accountsKeyrings,
        runtimeContext.config.general.ss58Format,
        false
    );
    
    logger.log('List of accounts');
    for (const [ alias, account ] of Object.entries(accounts)) {
        console.log(chalk.cyan(alias));
        console.log(account.address);
        console.log(account.isLocked ? chalk.green('Password protected') : chalk.yellow('Unprotected'));
        console.log();
    }
}

async function commandCreate (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Accounts');
    
    await runtimeContext.init(RunMode.Simple);
    runtimeContext.requestProjectDirectory();
    
    const accountsManager = new AccountsManager();
    
    const accountsKeyrings = await accountsManager.loadAccountsKeyringsFromConfigFile(runtimeContext);
    const accounts = await accountsManager.loadAccounts(
        accountsKeyrings,
        runtimeContext.config.general.ss58Format,
        false
    );
    
    const account = await accountsManager.createAccount(
        runtimeContext,
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
    const mainCommand = program.command('accounts')
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
