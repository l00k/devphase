import { expect, test } from '@oclif/test';
import chalk from 'chalk';
import { cleanUpContext, createConfigFile } from '../before-all.test';


describe('Command ' + chalk.cyan('account list'), () => {
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
        .command([
            'account list',
            '-v'
        ])
        .it('Should properly display created account in list', ctx => {
            expect(ctx.stdout).to.include('Account created');
            expect(ctx.stdout).to.include('sample');
        })
    ;
    
});
