import { RunMode } from '@/def';
import { BaseCommand } from '@/service/BaseCommand';
import { Initializer } from '@/service/project/Initializer';
import { Flags, ux } from '@oclif/core';


export class InitCommand
    extends BaseCommand<typeof InitCommand>
{

    public static summary : string = 'Initiate devPHAse project';
    
    public async run ()
    {
        ux.action.start('Initiation');
        
        await this.runtimeContext.initContext(RunMode.Simple);
        
        const initializer = new Initializer(this.runtimeContext);
        const result = await initializer.init();
        
        ux.action.stop();
        
        return { result };
    }
    
}
