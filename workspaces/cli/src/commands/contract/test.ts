import { BaseCommand } from '@/base/BaseCommand';
import { RunMode, RuntimeContext, StackSetupMode } from '@devphase/service';
import { Flags } from '@oclif/core';
import glob from 'glob';
import type { MochaOptions } from 'mocha';
import path from 'path';


export class ContractTestCommand
    extends BaseCommand<typeof ContractTestCommand>
{
    
    public static summary : string = 'Run tests for specified contract(s)';
    
    public static flags = {
        suite: Flags.string({
            summary: 'Test suite name (directory)',
            char: 's',
        }),
        network: Flags.string({
            summary: 'Network key',
            char: 'n',
            default: RuntimeContext.NETWORK_LOCAL,
        }),
        setupMode: Flags.string({
            summary: 'Stack setup mode',
            char: 'm',
            default: StackSetupMode.Minimal.toString(),
            options: Object.values(StackSetupMode).map(m => m.toString()),
        })
    };
    
    
    public async run ()
    {
        await this.runtimeContext.initContext(
            RunMode.Testing,
            this.flags.network
        );
        await this.runtimeContext.requestProjectDirectory();
        await this.runtimeContext.requestStackBinaries();
        
        this.runtimeContext.config.stack.setupOptions.mode = Number(this.flags.setupMode);
        
        const { default: Mocha } = await import('mocha');
        
        const mochaConfig : MochaOptions = {
            timeout: 10000,
            ...this.runtimeContext.config.testing.mocha
        };
        const mocha = new Mocha(mochaConfig);
        
        // add internals
        mocha.addFile(
            path.join(
                this.runtimeContext.paths.devphase,
                '/etc/mocha.global.ts'
            )
        );
        
        // grep test files
        const suitePath = this.flags.suite
            ? `/${this.flags.suite}/**/*.@(test|spec).@(ts|js)`
            : '/**/*.@(test|spec).@(ts|js)';
        
        const patterns = [
            [
                this.runtimeContext.config.directories.tests,
                suitePath
            ].join('')
        ];
        
        for (const pattern of patterns) {
            const files = glob.sync(pattern, { cwd: this.runtimeContext.paths.project });
            files.forEach(file => mocha.addFile(file));
        }
        
        await new Promise<number>((resolve) => {
            mocha.run(resolve);
        });
        
        mocha.dispose();
    }
    
}
