import { expect, test } from '@oclif/test';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { cleanUpContext, CONTEXT_PATH, createConfigFile } from '../before-all.test';


describe('Command ' + chalk.cyan('check'), () => {
    beforeEach(async() => {
        await cleanUpContext([
            '.gitignore',
            '.devphase',
            'contracts',
            'stacks',
            'tests'
        ]);
    });
    
    const pTest = test
        .stdout()
        .timeout(5_000)
        .command([ 'check', '-v' ])
    ;
    
    pTest.it('Should properly output checks', ctx => {
        expect(ctx.stdout).to.include('Checking configuration file [failed]');
    });
    
    pTest.it('Should create directories', ctx => {
        const stacksDirPath = path.join(
            CONTEXT_PATH,
            'stacks'
        );
        expect(fs.existsSync(stacksDirPath)).to.be.equal(true);
    });
    
    describe('With config file present', () => {
        beforeEach(async() => {
            await createConfigFile();
        });
        
        pTest.it('Should properly output checks', ctx => {
            expect(ctx.stdout).to.include('Check dependencies [completed]');
            expect(ctx.stdout).to.include('Checking releases directory [completed]');
            expect(ctx.stdout).to.include('Checking target release binaries [started]');
            expect(ctx.stdout).to.include('Checking Phala stack binaries [completed]');
        });
    });
    
});
