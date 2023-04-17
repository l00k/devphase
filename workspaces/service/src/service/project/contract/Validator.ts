import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import { validate } from '@phala/ink-validator';
import * as fs from 'fs';
import path from 'path';


export type ValidationResult = {
    exists : boolean,
    valid? : boolean,
    error? : string,
}

export class Validator
{
    
    protected _logger : Logger = new Logger('Validator');
    
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {}
    
    public async validate (
        contractName : string
    ) : Promise<ValidationResult>
    {
        const artifactPath = path.join(
            this._runtimeContext.paths.artifacts,
            contractName,
            `${contractName}.wasm`,
        );
        if (!fs.existsSync(artifactPath)) {
            return { exists: false };
        }
        
        const bytes = fs.readFileSync(artifactPath);
        const validation = await validate(bytes, false);
        
        return {
            exists: true,
            valid: validation !== 'string',
            error: validation,
        };
    }
    
}
