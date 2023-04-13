import { expect, test } from '@oclif/test';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { cleanUpContext, CONTEXT_PATH } from '../before-all.test';


describe('Command ' + chalk.cyan('init'), () => {
    beforeEach(async() => {
        await cleanUpContext([
            '.gitignore',
            '.devphase',
            'stacks',
            'tests'
        ]);
    });
    
    const pTest = test
        .stdout()
        .timeout(5_000)
        .command([ 'init', '-v' ])
        ;
        
    pTest.it('Should properly execute init', ctx => {
        expect(ctx.stdout).to.include('Creating directories');
        expect(ctx.stdout).to.include('Creating files');
        expect(ctx.stdout).to.include('Creating sample contract');
    });
    
    pTest.it('Should create config file', ctx => {
        const configFilePath = path.join(
            CONTEXT_PATH,
            'devphase.config.ts'
        );
        expect(fs.existsSync(configFilePath)).to.be.equal(true);
    });
    
    pTest.it('Should create sample contract', ctx => {
        const libPath = path.join(
            CONTEXT_PATH,
            'contracts/flipper/lib.rs'
        );
        expect(fs.existsSync(libPath)).to.be.equal(true);
        
        const cargoPath = path.join(
            CONTEXT_PATH,
            'contracts/flipper/Cargo.toml'
        );
        expect(fs.existsSync(cargoPath)).to.be.equal(true);
    });
});
