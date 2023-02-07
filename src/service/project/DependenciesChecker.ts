import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import childProcess from 'child_process';
import { compareVersions } from 'compare-versions';


type BinaryCheckResult = {
    valid : boolean,
    version : string,
}

export type DependenciesCheckResult = {
    valid : boolean,
    rustc : BinaryCheckResult,
    cargo : BinaryCheckResult,
    wasm32 : boolean,
};

export class DependenciesChecker
{
    
    protected _logger : Logger = new Logger('DependenciesChecker');
    
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {}
    
    public async check () : Promise<DependenciesCheckResult>
    {
        const result : DependenciesCheckResult = {
            valid: false,
            rustc: {
                valid: false,
                version: null,
            },
            cargo: {
                valid: false,
                version: null,
            },
            wasm32: false,
        };
        
        // rustc
        {
            this._logger.log('Checking rustc version');
        
            result.rustc.version = await this._exec('rustc -V');
            const match = result.rustc.version.match(/^rustc ([0-9]+\.[0-9]+\.[0-9]+)/);
            if (match) {
                result.rustc.valid = compareVersions(match[1], '1.59.0') >= 0;
            }
            
            if (result.rustc.valid) {
                this._logger.error('Failed');
            }
        }
        
        // cargo
        {
            this._logger.log('Checking cargo version');
            
            result.cargo.version = await this._exec('cargo +nightly -V');
            const match = result.cargo.version.match(/^cargo ([0-9]+\.[0-9]+\.[0-9]+)/);
            if (match) {
                result.cargo.valid = compareVersions(match[1], '1.59.0') >= 0;
            }
            
            if (result.cargo.valid) {
                this._logger.error('Failed');
            }
        }
        
        // wasm32
        {
            this._logger.log('Checking wasm32 target');
            
            const targets = await this._exec('rustup target list');
            const match = targets.match(/wasm32-unknown-unknown/);
            if (match) {
                result.wasm32 = true;
            }
            
            if (result.wasm32) {
                this._logger.error('Failed');
            }
        }
        
        result.valid = result.rustc.valid
            && result.cargo.valid
            && result.wasm32
        ;
        
        return result;
    }
    
    protected async _exec (
        command : string
    ) : Promise<string>
    {
        return childProcess.execSync(
            command,
            { encoding: 'utf-8' }
        );
    }
    
}
