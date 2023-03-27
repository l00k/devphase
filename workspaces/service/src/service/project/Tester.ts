import { StackSetupMode } from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import glob from 'glob';
import type { MochaOptions } from 'mocha';
import path from 'path';


export type RunTestsOptions = {
    suite? : string,
    network? : string,
    setupMode? : StackSetupMode,
}


export class Tester
{
    
    protected _logger : Logger = new Logger('Tester');
    
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {}
    
    public async runTests (
        options : RunTestsOptions = {}
    ) : Promise<void>
    {
        const { default: Mocha } = await import('mocha');
        
        // override setup mode
        this._runtimeContext.config.stack.setupOptions.mode = Number(options.setupMode);
        
        const mochaConfig : MochaOptions = {
            timeout: 10000,
            ...this._runtimeContext.config.testing.mocha
        };
        const mocha = new Mocha(mochaConfig);
        
        // add internals
        mocha.addFile(
            path.join(
                this._runtimeContext.paths.devphase,
                '/etc/mocha.global.ts'
            )
        );
        
        // grep test files
        const suitePath = options.suite
            ? `/${options.suite}/**/*.@(test|spec).@(ts|js)`
            : '/**/*.@(test|spec).@(ts|js)';
        
        const patterns = [
            [
                this._runtimeContext.config.directories.tests,
                suitePath
            ].join('')
        ];
        
        for (const pattern of patterns) {
            const files = glob.sync(pattern, { cwd: this._runtimeContext.paths.project });
            files.forEach(file => mocha.addFile(file));
        }
        
        await new Promise<number>((resolve) => {
            mocha.run(resolve);
        });
        
        mocha.dispose();
    }
    
}
