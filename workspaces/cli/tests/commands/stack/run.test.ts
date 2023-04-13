import { expect, test } from '@oclif/test';
import chalk from 'chalk';
import { cleanUpContext, createConfigFile } from '../before-all.test';


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
    
    const pTest = test
        .stdout()
        .timeout(20_000)
        .command([ 'stack run', '--timelimit=1' ])
    ;
    
    pTest
        .exit(0)
        .it('Should properly start stack', ctx => {
            expect(ctx.stdout).to.include('Starting stack');
            expect(ctx.stdout).to.include('✔ Start node component');
            expect(ctx.stdout).to.include('✔ Start pRuntime component');
            expect(ctx.stdout).to.include('✔ Start pherry component');
            expect(ctx.stdout).to.include('Time limit reached');
        })
    ;
});
