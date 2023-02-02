import { RunMode } from '@/def';
import { BaseCommand } from '@/service/BaseCommand';
import { AccountManager } from '@/service/project/AccountManager';
import { ux } from '@oclif/core';
import { table } from '@oclif/core/lib/cli-ux/styled/table';


export class AccountListCommand
    extends BaseCommand<typeof AccountListCommand>
{
    
    public static flags = {
        ...ux.table.flags(),
    };
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const accountManager = new AccountManager(this.runtimeContext);
        
        const accountsKeyrings = await accountManager.loadAccountsKeyringsFromStorageFile();
        const accounts = await accountManager.loadAccounts(
            accountsKeyrings,
            this.runtimeContext.config.general.ss58Format,
            false
        );
        
        const accountsOutput = Object.entries(accounts)
            .map(([ alias, account ]) => ({
                alias,
                address: account.address,
                protected: account.isLocked,
            }));
        
        if (!this.flags.json) {
            const columns : table.Columns<any> = {
                alias: {},
                address: {},
                protected: {},
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
            
            ux.table(accountsOutput, columns, options);
        }
        
        return accountsOutput;
    }
    
}
