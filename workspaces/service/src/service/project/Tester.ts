import { StackSetupMode } from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import glob from 'glob';
import type { MochaOptions } from 'mocha';
import path from 'path';


export type RunTestsOptions = {
    suite? : string,
    network : string,
    spawnStack : boolean,
    stackSetupMode : StackSetupMode,
}


export class Tester
{
    
    protected _logger : Logger = new Logger('Tester');
    
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {}
    
    public async runTests (
        options : Partial<RunTestsOptions> = {}
    ) : Promise<void>
    {
        const { default: Mocha } = await import('mocha');
        
        const testingConfig = this._runtimeContext.config.testing;
        
        // override testing options
        const networkConfig = this._runtimeContext.config.networks[options.network];
        if (!networkConfig) {
            throw new Exception(
                `Network <${options.network}> is not configured`,
                1680184917877
            );
        }
        
        this._runtimeContext.testingConfig.network = options.network;
        if (networkConfig.blockTime) {
            this._runtimeContext.testingConfig.blockTime = networkConfig.blockTime;
        }
        this._runtimeContext.testingConfig.spawnStack = options.spawnStack;
        this._runtimeContext.testingConfig.stackSetupMode = Number(options.stackSetupMode);
        
        const mochaConfig : MochaOptions = {
            timeout: this._runtimeContext.testingConfig.blockTime * 200,
            ...testingConfig.mocha
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
