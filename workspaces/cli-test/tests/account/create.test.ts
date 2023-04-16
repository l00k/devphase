import { expect, test } from '@oclif/test';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { cleanUpContext, CONTEXT_PATH, createConfigFile } from '../before-all.test';


describe('Command ' + chalk.cyan('account create'), () => {
    beforeEach(async() => {
        await cleanUpContext([
            '.gitignore',
            '.devphase',
            'contracts',
            'stacks',
            'tests'
        ]);
        await createConfigFile();
    });
    
    const pTest = test
        .stdout()
        .timeout(5_000)
    ;
    
    pTest
        .command([
            'account create',
            '-a=sample',
            '-n',
            '-v'
        ])
        .it('Should properly create account without passphrase', ctx => {
            expect(ctx.stdout).to.include('Account created');
        })
        ;
    
    pTest
        .stderr()
        .command([
            'account create',
            '-a=sample',
            '-n',
            '-v'
        ])
        .command([
            'account create',
            '-a=sample',
            '-n',
            '-v'
        ])
        .catch(e => {
            expect(e.toString()).to.include('Account with given alias already exists');
        })
        .it('Should not be able to create duplicated account', ctx => {
            expect(ctx.stdout).to.include('Account created');
        })
        ;
    
});
