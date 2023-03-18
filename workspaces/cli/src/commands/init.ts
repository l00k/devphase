import { BaseCommand } from '@/base/BaseCommand';
import { Initializer, RunMode } from '@devphase/service';


export class InitCommand
    extends BaseCommand<typeof InitCommand>
{
    
    public static summary : string = 'Initiate devPHAse project';
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        
        const initializer = new Initializer(this.runtimeContext);
        const result = await initializer.init();
        
        return { result };
    }
    
}
