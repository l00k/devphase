import { cleanUpContext, createConfigFile, runCommand } from '@/utils';
import chalk from 'chalk';


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
    
    
    it('Should properly create account without passphrase', async function() {
        const { stdout, stderr, status } = await runCommand(
            'account create',
            [ '-a=sample', '-n', '-v' ],
            { timeout: 5_000 },
        );
        
        expect(stdout).to.include('Account created');
    });
    
    it('Account with given alias already exists', async function() {
        {
            const { stdout, stderr, status } = await runCommand(
                'account create',
                [ '-a=sample', '-n', '-v' ],
                { timeout: 5_000 },
            );
            expect(stdout).to.include('Account created');
        }
        
        {
            const { stdout, stderr, status } = await runCommand(
                'account create',
                [ '-a=sample', '-n', '-v' ],
                { timeout: 5_000 },
            );
            
            expect(stderr).to.include('Account with given alias already exists');
            expect(status).to.be.eql(1);
        }
    });
    
});
