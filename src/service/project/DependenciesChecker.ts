import { RuntimeContext } from '@/service/project/RuntimeContext';


type DependenciesCheckResult = {
    valid : boolean,
};

export class DependenciesChecker
{
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {}
    
    public async check () : Promise<DependenciesCheckResult>
    {
        const result : DependenciesCheckResult = {
            valid: true,
        };
        
        
        return result;
    }
    
}
