import { BaseCommand } from '@/base/BaseCommand';
import { Exception } from '@/utils/Exception';
import { DependenciesChecker, DependenciesCheckResult, RunMode } from '@devphase/service';
import Listr from 'listr';


type CheckResult = {
    configurationFile : boolean,
    dependencies : DependenciesCheckResult,
    stackBinaries : boolean,
}


export class CheckCommand
    extends BaseCommand<typeof CheckCommand>
{
    
    public static summary : string = 'Check project';
    
    public async run ()
    {
        await this.runtimeContext.initContext(RunMode.Simple);
        
        const checkResult : CheckResult = {
            configurationFile: false,
            dependencies: null,
            stackBinaries: false,
        };
        
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
                    checkResult.dependencies = result;
                    
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
        
        try {
            await listr.run();
            
            checkResult.configurationFile = true;
            checkResult.stackBinaries = true;
        }
        catch (e) {
            this._logger.log(checkResult);
            this._logger.error(e);
        }
        
        return checkResult;
    }
    
}
