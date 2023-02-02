import { RunMode } from '@/def';
import { BaseCommand } from '@/service/BaseCommand';
import { AccountManager } from '@/service/project/AccountManager';
import { Flags, ux } from '@oclif/core';
import { table } from '@oclif/core/lib/cli-ux/styled/table';
import chalk from 'chalk';


export class AccountCreateCommand
    extends BaseCommand<typeof AccountCreateCommand>
{
    
    public static summary : string = 'Creates new managed account';
    
    public static flags = {
        alias: Flags.string({
            summary: 'Account alias',
            char: 'a',
            required: true,
        }),
        passphrase: Flags.string({
            summary: 'Passphrase used to protect keyring',
            char: 'p',
        }),
        'no-passphrase': Flags.boolean({
            summary: 'Force no passphrase (prompted if not specified)',
            char: 'n',
        })
    };
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const accountManager = new AccountManager(this.runtimeContext);
        
        const account = await accountManager.createAccount(
            {
                alias: this.flags.alias,
                passphrase: this.flags.passphrase,
                noPassphrase: this.flags['no-passphrase'],
            },
            this.runtimeContext.config.general.ss58Format
        );
        
        // display
        if (!this.flags.json) {
            ux.debug(chalk.green('Account created'));
            ux.debug('');
            
            const columns : table.Columns<any> = {
                alias: {},
                address: {},
                isLocked: {},
            };
            const options : table.Options = {
                columns: this.flags.columns,
                sort: this.flags.sort,
                filter: this.flags.filter,
                csv: this.flags.csv,
                extended: this.flags.extended,
                'no-truncate': this.flags['no-truncate'],
                'no-header': this.flags['no-header'],
            };
            
            ux.table([
                {
                    alias: account.alias,
                    address: account.keyring.address,
                    protected: account.keyring.isLocked,
                }
            ], columns, options);
        }
        
        return {
            alias: account.alias,
            address: account.keyring.address,
            protected: account.keyring.isLocked,
        };
    }
    
}
