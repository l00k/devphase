import { expect, test } from '@oclif/test';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


describe('Command ' + chalk.cyan('check'), () => {
    const ROOT_PATH = process.cwd();
    const CONTEXT_PATH = path.resolve('./tests/context');
    const PRESERVE_FILES = [
        '.gitignore',
        '.devphase',
        'contracts',
        'stacks',
        'tests'
    ];
    
    beforeEach(() => {
        // restore working dir
        process.chdir(ROOT_PATH);
    
        // clean up context
        const files = fs.readdirSync(CONTEXT_PATH);
        const filesToDelete = files.filter(file => !PRESERVE_FILES.includes(file));
        
        filesToDelete.forEach(file => {
            const filePath = path.join(
                CONTEXT_PATH,
                file
            );
            fs.rmSync(filePath, { recursive: true });
        });
        
        // create config file
        const configFilePath = path.join(
            CONTEXT_PATH,
            'devphase.config.json'
        );
        fs.writeFileSync(configFilePath, '{}', { encoding: 'utf-8' });
        
        // change working dir to context
        process.chdir(CONTEXT_PATH);
    });
    
    const pTest = test
        .stdout()//{ print: true })
        .timeout(10_000)
        .command([ 'check', '-v' ])
        ;
    
    pTest.it('Should properly output checks', ctx => {
        expect(ctx.stdout).to.include('Checking configuration file [completed]');
        expect(ctx.stdout).to.include('Check dependencies [completed]');
        expect(ctx.stdout).to.include('Checking releases directory [completed]');
        expect(ctx.stdout).to.include('Checking target release binaries [started]');
        expect(ctx.stdout).to.include('Checking Phala stack binaries [completed]');
    });
    
    pTest.it('Should create directories', ctx => {
        const stacksDirPath = path.join(
            CONTEXT_PATH,
            'stacks'
        );
        expect(fs.existsSync(stacksDirPath)).to.be.equal(true);
    });
    
});
