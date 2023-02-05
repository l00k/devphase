import { RunMode } from '@/def';
import { BaseCommand } from '@/service/BaseCommand';
import { DependenciesChecker } from '@/service/project/DependenciesChecker';
import { Exception } from '@/utils/Exception';
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
                    const dependenciesChecker = new DependenciesChecker(this.runtimeContext);
                    const result = await dependenciesChecker.check();
                    if (!result.valid) {
                        throw new Exception(
                            'Dependencies check failed',
                            1675583898739
                        );
                    }
                },
            },
            {
                title: 'Checking Phala stack binaries',
                task: () => this.runtimeContext.requestStackBinaries(false),
            }
        ], {
            renderer: this.runtimeContext.listrRenderer
        });
        
        await listr.run();
    }
    
}
