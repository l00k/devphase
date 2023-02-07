import { RunMode, VerbosityLevel } from '@/def';
import { BaseCommand } from '@/service/BaseCommand';
import { StackManager } from '@/service/project/StackManager';
import { Logger } from '@/utils/Logger';
import { Flags, ux } from '@oclif/core';


export class StackRunCommand
    extends BaseCommand<typeof StackRunCommand>
{

    public static summary : string = 'Starts local development stack';
    
    public static flags = {
        'save-logs': Flags.boolean({
            summary: 'Save logs to file',
            default: false
        }),
    };
    
    
    public async run ()
    {
        ux.action.start('Starting local stack');
        
        await this.runtimeContext.initContext(RunMode.Simple);
        await this.runtimeContext.requestProjectDirectory();
        await this.runtimeContext.requestStackBinaries();
        
        const stackManager = new StackManager(this.runtimeContext);
        
        try {
            await stackManager.startStack(
                RunMode.Simple,
                {
                    saveLogs: this.flags['save-logs'],
                }
            );
        }
        catch (e) {
            await stackManager.stopStack();
            throw e;
        }
    
        ux.action.stop();
        
        process.on('SIGINT', async() => {
            this._logger.warn('Got SIGINT - shutting down');
            
            await stackManager.stopStack();
        });
    }
    
}
