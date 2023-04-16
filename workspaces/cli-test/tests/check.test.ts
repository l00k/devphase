import { cleanUpContext, CONTEXT_PATH, createConfigFile, runCommand } from '@/utils';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


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
    
    it('Should properly output checks', async() => {
        const { stdout, stderr, status } = await runCommand(
            'check',
            [ '-v' ],
            5_000,
        );
        
        expect(stdout).to.include('Checking configuration file [failed]');
    });
    
    it('Should create directories', async() => {
        const { stdout, stderr, status } = await runCommand(
            'check',
            [ '-v' ],
            5_000,
        );
        
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
        
        it('Should properly output checks', async() => {
            const { stdout, stderr, status } = await runCommand(
                'check',
                [ '-v' ],
                5_000,
            );
            
            expect(stdout).to.include('Check dependencies [completed]');
            expect(stdout).to.include('Checking releases directory [completed]');
            expect(stdout).to.include('Checking target release binaries [started]');
            expect(stdout).to.include('Checking Phala stack binaries [completed]');
        });
    });
    
});
