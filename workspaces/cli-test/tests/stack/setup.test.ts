import {
    cleanUpContext,
    CONTEXT_PATH,
    createConfigFile,
    runAsyncCommand,
    RunAsyncCommandResult,
    runCommand, sleep
} from '@/utils';
import { Logger, RunMode, RuntimeContext, StackManager, VerbosityLevel } from '@devphase/service';
import chalk from 'chalk';


describe('Command ' + chalk.cyan('stack setup'), () => {
    let stackCmd : RunAsyncCommandResult;
    
    beforeEach(async() => {
        await cleanUpContext([
            '.gitignore',
            '.devphase',
            'contracts',
            'stacks',
            'tests'
        ]);
        
        await createConfigFile({
            stack: {
                blockTime: 50,
            },
            testing: {
                blockTime: 50,
            }
        });
    });
    
    beforeEach(async function() {
        this.timeout(21_000);
        
        if (stackCmd) {
            stackCmd.process.kill('SIGINT');
            await sleep(1_000);
        }
        
        stackCmd = await runAsyncCommand(
            'stack run',
            [ '-v' ],
            {
                timeout: 20_000,
                waitFor: (stdout, stderr) => (stdout ?? stderr).includes('Start pherry component [completed]')
            },
        );
    });
    
    after(async function () {
        if (stackCmd) {
            stackCmd.process.kill('SIGINT');
            await sleep(1_000);
        }
    });
    
    
    it('Should properly setup stack in Minimal mode', async function() {
        this.timeout(20_000);
        
        const { stdout, stderr, status } = await runCommand(
            'stack setup',
            [ '-m=1', '-v' ],
            { timeout: 20_000 },
        );

        expect(stdout).to.include('Fetch worker info [completed]');
        expect(stdout).to.include('Load system contracts [completed]');
        expect(stdout).to.include('Register worker [skipped]');
        expect(stdout).to.include('Register gatekeeper [completed]');
        expect(stdout).to.include('Upload Pink system code [completed]');
        expect(stdout).to.include('Verify cluster [completed]');
        expect(stdout).to.include('Create cluster [completed]');
        expect(stdout).to.include('Wait for cluster to be ready [completed]');
        expect(stdout).to.include('Create system contract API [completed]');

        expect(stdout).to.include('Stack is ready');
    });
    
    it('Should properly setup stack in WithDrivers mode', async function() {
        this.timeout(60_000);

        const { stdout, stderr, status } = await runCommand(
            'stack setup',
            [ '-m=2', '-v' ],
            { timeout: 60_000 },
        );

        expect(stdout).to.include('Fetch worker info [completed]');
        expect(stdout).to.include('Load system contracts [completed]');
        expect(stdout).to.include('Register worker [skipped]');
        expect(stdout).to.include('Register gatekeeper [completed]');
        expect(stdout).to.include('Upload Pink system code [completed]');
        expect(stdout).to.include('Verify cluster [completed]');
        expect(stdout).to.include('Create cluster [completed]');
        expect(stdout).to.include('Wait for cluster to be ready [completed]');
        expect(stdout).to.include('Create system contract API [completed]');
        expect(stdout).to.include('Deploy tokenomic driver [completed]');
        expect(stdout).to.include('Deploy SideVM driver [completed]');

        expect(stdout).to.include('Stack is ready');
    });

    it('Should properly setup stack in WithLogger mode', async function() {
        this.timeout(90_000);

        const { stdout, stderr, status } = await runCommand(
            'stack setup',
            [ '-m=3', '-v' ],
            { timeout: 90_000 },
        );

        expect(stdout).to.include('Fetch worker info [completed]');
        expect(stdout).to.include('Load system contracts [completed]');
        expect(stdout).to.include('Register worker [skipped]');
        expect(stdout).to.include('Register gatekeeper [completed]');
        expect(stdout).to.include('Upload Pink system code [completed]');
        expect(stdout).to.include('Verify cluster [completed]');
        expect(stdout).to.include('Create cluster [completed]');
        expect(stdout).to.include('Wait for cluster to be ready [completed]');
        expect(stdout).to.include('Create system contract API [completed]');
        expect(stdout).to.include('Deploy tokenomic driver [completed]');
        expect(stdout).to.include('Deploy SideVM driver [completed]');
        expect(stdout).to.include('Calculate logger server contract ID [completed]');
        expect(stdout).to.include('Prepare chain for logger server [completed]');
        expect(stdout).to.include('Deploy logger server [completed]');

        expect(stdout).to.include('Stack is ready');
    });
});
