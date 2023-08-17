import { cleanUpContext, createConfigFile, runCommand } from '@/utils';
import chalk from 'chalk';


describe('Command ' + chalk.cyan('stack run'), () => {
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
    
    it('Should properly start stack', async() => {
        const { stdout, stderr, status } = await runCommand(
            'stack run',
            [ '--timelimit=1' ],
            { timeout: 20_000 },
        );
        
        expect(stdout).to.include('Starting stack');
        expect(stdout).to.include('Start node component [completed]');
        expect(stdout).to.include('Start pRuntime component [completed]');
        expect(stdout).to.include('Start pherry component [completed]');
        expect(stdout).to.include('Time limit reached');
        expect(status).to.be.eql(1);
    });
});
