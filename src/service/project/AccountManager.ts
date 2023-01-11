import { AccountKeyringsConfig, Accounts } from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import * as Keyring from '@polkadot/keyring';
import type { KeyringPair } from '@polkadot/keyring/types';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { waitReady } from '@polkadot/wasm-crypto';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';


export type CreatedAccount = {
    alias : string,
    keyring : KeyringPair,
}


export class AccountManager
{
    
    protected _logger = new Logger(AccountManager.name);
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {}
    
    
    public async loadAccountsKeyringsFromStorageFile () : Promise<AccountKeyringsConfig>
    {
        const accountsStoragePath = path.join(
            this._runtimeContext.paths.project,
            'accounts.json'
        );
        if (!fs.existsSync(accountsStoragePath)) {
            return null;
        }
        
        return JSON.parse(
            fs.readFileSync(accountsStoragePath, { encoding: 'utf-8' })
        );
    }
    
    public async loadAccounts (
        accountKeyrings : AccountKeyringsConfig,
        ss58Format : number = 30,
        unlock : boolean = true
    ) : Promise<Accounts>
    {
        await waitReady();
        
        const accounts : Accounts = {};
        
        // load accounts
        const keyring = new Keyring.Keyring();
        
        if (ss58Format) {
            keyring.setSS58Format(ss58Format);
        }
        
        for (const [ alias, accountKeyring ] of Object.entries(accountKeyrings)) {
            if (typeof accountKeyring === 'string') {
                accounts[alias] = keyring.createFromUri(
                    accountKeyring,
                    undefined,
                    'sr25519'
                );
            }
            else {
                accounts[alias] = keyring.createFromJson(accountKeyring);
            }
        }
        
        // unlock accounts if required
        if (unlock) {
            for (const [ alias, keyring ] of Object.entries(accounts)) {
                if (keyring.isLocked) {
                    const { password } = await prompts({
                        type: 'password',
                        name: 'password',
                        message: `Account ${chalk.cyan(alias)} is locked. Provide password:`
                    });
                    
                    try {
                        keyring.unlock(password);
                    }
                    catch (e) {
                        throw new Exception(
                            'Unable to unlock account keyring',
                            1673268293515,
                            e
                        );
                    }
                }
            }
        }
        
        return accounts;
    }
    
    public async createAccount (
        ss58Format : number = 30
    ) : Promise<CreatedAccount>
    {
        const account : CreatedAccount = {
            alias: '',
            keyring: null,
        };
        
        const { alias } = await prompts({
            type: 'text',
            name: 'alias',
            message: `Account alias`,
            validate: alias => /^[a-z0-9_]+$/.test(alias)
        });
        account.alias = alias;
        
        const keyring = new Keyring.Keyring({
            type: 'sr25519',
            ss58Format
        });
        
        const mnemonic : string = mnemonicGenerate();
        account.keyring = keyring.addFromMnemonic(mnemonic);
        
        const { password } = await prompts({
            type: 'password',
            name: 'password',
            message: `Account password (leave empty if to save as plain text)`,
        });
        
        const exported : any = !!password
            ? account.keyring.toJson(password)
            : mnemonic
        ;
        
        // export to config file
        const accountsConfigPath = path.join(
            this._runtimeContext.paths.project,
            'accounts.json'
        );
        if (!fs.existsSync(accountsConfigPath)) {
            return null;
        }
        
        const accountsJson = JSON.parse(
            fs.readFileSync(accountsConfigPath, { encoding: 'utf-8' })
        );
        
        accountsJson[alias] = exported;
        
        fs.writeFileSync(
            accountsConfigPath,
            JSON.stringify(accountsJson, undefined, 4),
            { encoding: 'utf-8' }
        );
        
        return account;
    }
    
}
