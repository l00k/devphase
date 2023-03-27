import { AccountKeyringsConfig, Accounts } from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Exception } from '@/utils/Exception';
import * as Keyring from '@polkadot/keyring';
import type { KeyringPair } from '@polkadot/keyring/types';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { waitReady } from '@polkadot/wasm-crypto';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';


export type AccountCreateOptions = {
    alias : string,
    passphrase? : string,
    noPassphrase? : boolean,
}

export type CreatedAccount = {
    alias : string,
    keyring : KeyringPair,
}


export class AccountManager
{
    
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
                        message: `Account ${chalk.cyan(alias)} is locked. Provide password:`,
                        type: 'mask',
                        name: 'password',
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
        options : AccountCreateOptions,
        ss58Format : number = 30
    ) : Promise<CreatedAccount>
    {
        // validate
        const accountAliasValidator = value => /^[a-z0-9_]+$/.test(value);
        if (!accountAliasValidator(options.alias)) {
            throw new Exception(
                'Unallowed characters in account alias',
                1674652892297
            );
        }
        
        const accountsKeyrings = await this.loadAccountsKeyringsFromStorageFile();
        if (accountsKeyrings[options.alias]) {
            throw new Exception(
                'Account with given alias already exists',
                1674653030541
            );
        }
        
        // create
        const account : CreatedAccount = {
            alias: options.alias,
            keyring: null,
        };
        
        const keyring = new Keyring.Keyring({
            type: 'sr25519',
            ss58Format
        });
        
        const mnemonic : string = mnemonicGenerate();
        account.keyring = keyring.addFromMnemonic(mnemonic);
        
        if (
            !options.passphrase
            && !options.noPassphrase
        ) {
            const { passphrase } = await prompts({
                message: 'Account passphrase (leave empty if to save as plain text)',
                type: 'mask',
                name: 'password',
            });
            options.passphrase = passphrase;
        }
        
        const exported : any = !!options.passphrase
            ? account.keyring.toJson(options.passphrase)
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
        
        accountsJson[options.alias] = exported;
        
        fs.writeFileSync(
            accountsConfigPath,
            JSON.stringify(accountsJson, undefined, 4),
            { encoding: 'utf-8' }
        );
        
        // lock account
        if (options.passphrase) {
            account.keyring.lock();
        }
        
        return account;
    }
    
}
