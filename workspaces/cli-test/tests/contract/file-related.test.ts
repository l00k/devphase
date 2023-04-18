import { cleanUpContext, CONTEXT_PATH, createConfigFile, RunAsyncCommandResult, runCommand } from '@/utils';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


describe('File related ' + chalk.cyan('contract') + ' commands', () => {
    let stackCmd : RunAsyncCommandResult;
    
    before(async function() {
        await cleanUpContext([
            '.gitignore',
            '.devphase',
            'stacks',
            'tests'
        ]);
        
        await createConfigFile({
            stack: {
                blockTime: 100,
            },
            testing: {
                blockTime: 100,
            }
        });
    });
    
    it('Should properly create contract files', async function() {
        const { stdout, stderr, status } = await runCommand(
            'contract create',
            [ '-n=sample', '-v' ],
            { timeout: 5_000 },
        );
        
        expect(stdout).to.include('Contract created in');
        
        // check contract directory
        const contractDirPath = path.resolve(
            CONTEXT_PATH,
            'contracts/sample'
        );
        expect(fs.existsSync(contractDirPath))
            .to.be.eql(true, 'Directory exists');
        
        // check lib.rs file
        const libRsFilePath = path.resolve(
            CONTEXT_PATH,
            'contracts/sample/lib.rs'
        );
        expect(fs.existsSync(libRsFilePath))
            .to.be.eql(true, 'lib.rs file exists');
        
        // check Cargo.toml file
        const cargoTomlFilePath = path.resolve(
            CONTEXT_PATH,
            'contracts/sample/Cargo.toml'
        );
        expect(fs.existsSync(cargoTomlFilePath))
            .to.be.eql(true, 'lib.rs file exists');
    });
    
    describe('with contract created', () => {
        before(async function() {
            this.timeout(5_000);
            
            await cleanUpContext([
                '.gitignore',
                '.devphase',
                'contracts',
                'stacks',
                'tests',
                'devphase.config.json',
            ]);
            
            await runCommand(
                'contract create',
                [ '-n=sample', '-v' ],
                { timeout: 5_000 },
            );
        });
        
        it('Should properly compile sample contract', async function() {
            this.timeout(300_000);
            
            const { stdout, stderr, status } = await runCommand(
                'contract compile',
                [ '-c=sample', '-v' ],
                { timeout: 300_000 },
            );
            
            console.log({ stdout, stderr, status });
            
            expect(stdout).to.include('Compilation [completed]');
            expect(stdout).to.include('Validation [completed]');
            expect(stdout).to.include('Type binding [completed]');
            
            // check build directory
            const buildDirPath = path.resolve(
                CONTEXT_PATH,
                'contracts/sample/target'
            );
            expect(fs.existsSync(buildDirPath))
                .to.be.eql(true, 'Build directory exists');
            
            // check build directory
            const artifactsDirPath = path.resolve(
                CONTEXT_PATH,
                'artifacts/sample'
            );
            expect(fs.existsSync(artifactsDirPath))
                .to.be.eql(true, 'Artifacts directory exists');
            
            // check types file
            const typesFilePath = path.resolve(
                CONTEXT_PATH,
                'typings/Sample.ts'
            );
            expect(fs.existsSync(typesFilePath))
                .to.be.eql(true, 'Types file exists');
        });
        
        
        describe('with contract compiled', () => {
            before(async function() {
                this.timeout(60_000);
                
                await cleanUpContext([
                    '.gitignore',
                    '.devphase',
                    'artifacts',
                    'contracts',
                    'stacks',
                    'tests',
                    'typings',
                    'devphase.config.json',
                ]);
                
                await runCommand(
                    'contract compile',
                    [ '-c=sample', '-v' ],
                    { timeout: 60_000 },
                );
            });
            
            
            it('Should properly validate sample contract', async function() {
                const { stdout, stderr, status } = await runCommand(
                    'contract validate',
                    [ '-c=sample', '-v' ],
                    { timeout: 10_000 },
                );
                
                expect(stdout).to.include('Validation [completed]');
                expect(stdout).to.include('sample [completed]');
            });
            
            it('Should properly generate sample contract types', async function() {
                const { stdout, stderr, status } = await runCommand(
                    'contract typegen',
                    [ '-c=sample', '-v' ],
                    { timeout: 10_000 },
                );
                
                expect(stdout).to.include('Generating type bindings for');
                
                // check types file
                const typesFilePath = path.resolve(
                    CONTEXT_PATH,
                    'typings/Sample.ts'
                );
                expect(fs.existsSync(typesFilePath))
                    .to.be.eql(true, 'Types file exists');
            });
            
            it('Should properly test contracts', async function() {
                this.timeout(120_000);
                
                const { stdout, stderr, status } = await runCommand(
                    'contract test',
                    [ '-t=sample', '-v' ],
                    { timeout: 120_000 },
                );
                
                expect(stdout).to.include('Starting tests');
                expect(stdout).to.include('default constructor');
                expect(stdout).to.include('new constructor');
                expect(stdout).to.include('✔ Should be created with proper intial value');
                expect(stdout).to.include('2 passing');
            });
        });
    });
});
