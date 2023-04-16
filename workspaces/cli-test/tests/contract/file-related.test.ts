import { Config } from '@oclif/core';
import { expect, test } from '@oclif/test';
import chalk from 'chalk';
import { cleanUpContext, CONTEXT_PATH, createConfigFile } from '../before-all.test';


describe('File related ' + chalk.cyan('contract') + ' commands', () => {
    let oclifConfig : Config;
    
    before(async() => {
        await cleanUpContext([
            '.gitignore',
            '.devphase',
            'stacks',
            'tests',
            'devphase.config.json',
        ]);
        
        await createConfigFile({
            stack: {
                blockTime: 100
            }
        });
        
        oclifConfig = await Config.load({
            root: CONTEXT_PATH,
        });
    });
    
    // describe('Command ' + chalk.cyan('contract create'), () => {
    //     test
    //         .stdout()
    //         .timeout(5_000)
    //         .command([
    //             'contract create',
    //             '-n=sample',
    //             '-v'
    //         ])
    //         .it('Should properly create contract files', ctx => {
    //             expect(ctx.stdout).to.include('Contract created in');
    //
    //             // check contract directory
    //             const contractDirPath = path.resolve(
    //                 CONTEXT_PATH,
    //                 'contracts/sample'
    //             );
    //             expect(fs.existsSync(contractDirPath))
    //                 .to.be.eql(true, 'Directory exists');
    //
    //             // check lib.rs file
    //             const libRsFilePath = path.resolve(
    //                 CONTEXT_PATH,
    //                 'contracts/sample/lib.rs'
    //             );
    //             expect(fs.existsSync(libRsFilePath))
    //                 .to.be.eql(true, 'lib.rs file exists');
    //
    //             // check Cargo.toml file
    //             const cargoTomlFilePath = path.resolve(
    //                 CONTEXT_PATH,
    //                 'contracts/sample/Cargo.toml'
    //             );
    //             expect(fs.existsSync(cargoTomlFilePath))
    //                 .to.be.eql(true, 'lib.rs file exists');
    //         })
    //     ;
    // });
    
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
            
            await oclifConfig.runCommand('contract:create', [
                '-n=sample',
                '-v'
            ]);
        });
        
        // test
        //     .stdout()
        //     .timeout(300_000)
        //     .command([
        //         'contract compile',
        //         '-c=sample',
        //         '-v'
        //     ])
        //     .it('Should properly compile sample contract', ctx => {
        //         expect(ctx.stdout).to.include('Compilation [completed]');
        //         expect(ctx.stdout).to.include('Type binding [completed]');
        //
        //         // check build directory
        //         const buildDirPath = path.resolve(
        //             CONTEXT_PATH,
        //             'contracts/sample/target'
        //         );
        //         expect(fs.existsSync(buildDirPath))
        //             .to.be.eql(true, 'Build directory exists');
        //
        //         // check build directory
        //         const artifactsDirPath = path.resolve(
        //             CONTEXT_PATH,
        //             'artifacts/sample'
        //         );
        //         expect(fs.existsSync(artifactsDirPath))
        //             .to.be.eql(true, 'Artifacts directory exists');
        //
        //         // check types file
        //         const typesFilePath = path.resolve(
        //             CONTEXT_PATH,
        //             'typings/Sample.ts'
        //         );
        //         expect(fs.existsSync(typesFilePath))
        //             .to.be.eql(true, 'Types file exists');
        //     })
        // ;
        //
        describe('with contract compiled', () => {
            before(async function() {
                this.timeout(120_000);
                
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
                
                await oclifConfig.runCommand('contract:compile', [
                    '-c=sample',
                    '-v'
                ]);
            });
            
            // test
            //     .stdout()
            //     .timeout(5_000)
            //     .command([
            //         'contract typegen',
            //         '-c=sample',
            //         '-v'
            //     ])
            //     .it('Should properly generate sample contract types', ctx => {
            //         expect(ctx.stdout).to.include('Generating type bindings for');
            //
            //         // check types file
            //         const typesFilePath = path.resolve(
            //             CONTEXT_PATH,
            //             'typings/Sample.ts'
            //         );
            //         expect(fs.existsSync(typesFilePath))
            //             .to.be.eql(true, 'Types file exists');
            //     })
            // ;
            
            test
                .stdout({ print: true })
                .timeout(120_000)
                .command([
                    'contract test',
                    '-t=sample',
                    '-v'
                ])
                .it('Should properly test contracts', ctx => {
                    expect(ctx.stdout).to.include('Starting tests');
                    expect(ctx.stdout).to.include('default constructor');
                    expect(ctx.stdout).to.include('new constructor');
                    expect(ctx.stdout).to.include('✔ Should be created with proper intial value');
                    expect(ctx.stdout).to.include('2 passing');
                })
            ;
        });
    });
    
});
