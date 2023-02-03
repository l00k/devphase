import { RunMode } from '@/def';
import { BaseCommand } from '@/service/BaseCommand';
import Listr from 'listr';


export class CheckCommand
    extends BaseCommand<typeof CheckCommand>
{

    public static summary : string = 'Check project';
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        
        const listr = new Listr([
            {
                title: 'Checking configuration file',
                task: () => this.runtimeContext.requestProjectDirectory(),
            },
            {
                title: 'Checking Phala stack binaries',
                task: () => this.runtimeContext.requestStackBinaries(false),
            }
        ]);
        
        await listr.run();
    }
    
}
