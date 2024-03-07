import { BaseCommand } from '@/base/BaseCommand';
import { DevPhase, PinkLogger, RunMode, RuntimeContext, StackSetupMode } from '@devphase/service';
import { Args, Flags } from '@oclif/core';
import chalk from 'chalk';
import path from 'path';


export class ScriptCommand
    extends BaseCommand<typeof ScriptCommand>
{
    
    public static summary : string = 'Run script';
    
    public static flags = {
        network: Flags.string({
            summary: 'Network key',
            char: 'n',
            default: RuntimeContext.NETWORK_LOCAL
        }),
    };
    
    public static args = {
        args: Args.string({
            description: 'Script(s) to execute',
            multiple: true,
        })
    };
    
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        
        const devPhase = await DevPhase.create(
            this.runtimeContext,
            { network: this.flags.network }
        );
        
        // prepare
        await devPhase.stackSetup({ mode: StackSetupMode.None });
        
        let pinkLogger : PinkLogger;
        
        try {
            pinkLogger = await devPhase.getPinkLogger();
        }
        catch (e) {
            // logger not available? ignore
        }
        
        // run scripts
        let result : Record<string, any> = {};
        
        for (const scriptRelPath of this.argsRaw) {
            const scriptPath = path.resolve(
                this.runtimeContext.paths.project,
                scriptRelPath
            );
            const scriptFn = (await import(scriptPath)).default;
            
            this._logger.log('Executing', chalk.cyan(scriptPath));
            
            result[scriptPath] = await scriptFn(
                this.runtimeContext,
                devPhase
            );
        }
        
        // teardown
        if (pinkLogger) {
            await pinkLogger.saveLogs();
        }
        
        await devPhase.cleanup();
        
        return result;
    }
    
}
