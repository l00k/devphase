import { cleanUpContext, CONTEXT_PATH, runCommand } from '@/utils';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


describe('Command ' + chalk.cyan('init'), () => {
    beforeEach(async() => {
        await cleanUpContext([
            '.gitignore',
            '.devphase',
            'stacks',
            'tests'
        ]);
    });
    
    it('Should properly execute init', async() => {
        const { stdout, stderr, status } = await runCommand(
            'init',
            [ '-v' ],
            { timeout: 5_000 },
        );
        
        expect(stdout).to.include('Creating directories');
        expect(stdout).to.include('Creating files');
        expect(stdout).to.include('Creating sample contract');
        
        // should create config file
        const configFilePath = path.join(
            CONTEXT_PATH,
            'devphase.config.ts'
        );
        expect(fs.existsSync(configFilePath))
            .to.be.equal(true, 'Config file exists');
        
        // contract files
        const libPath = path.join(
            CONTEXT_PATH,
            'contracts/flipper/lib.rs'
        );
        expect(fs.existsSync(libPath))
            .to.be.equal(true, 'lib.rs file exists');
        
        const cargoPath = path.join(
            CONTEXT_PATH,
            'contracts/flipper/Cargo.toml'
        );
        expect(fs.existsSync(cargoPath))
            .to.be.equal(true, 'Cargo.toml file exists');
    });
});
