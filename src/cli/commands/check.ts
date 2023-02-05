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
                title: 'Check dependencies',
                task: async() => {
                    // todo ld 2023-02-05 05:47:20
                    // check rust etc dependencies
                },
            },
            {
                title: 'Checking Phala stack binaries',
                task: () => this.runtimeContext.requestStackBinaries(false),
            }
        ]);
        
        await listr.run();
    }
    
}
