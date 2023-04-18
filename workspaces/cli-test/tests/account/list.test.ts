import { cleanUpContext, createConfigFile, runCommand } from '@/utils';
import chalk from 'chalk';


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
    
    
    it('Should properly display created account in list', async function() {
        {
            const { stdout, stderr, status } = await runCommand(
                'account create',
                [ '-a=sample', '-n', '-v' ],
                { timeout: 5_000 },
            );
        }
        
        {
            const { stdout, stderr, status } = await runCommand(
                'account list',
                [ '-v' ],
                { timeout: 5_000 },
            );
            
            expect(stdout).to.include('sample');
        }
    });
    
});
