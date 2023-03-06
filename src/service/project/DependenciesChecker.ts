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
    contract : BinaryCheckResult,
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
            contract: {
                valid: false,
                version: null,
            },
            wasm32: false,
        };
        
        // rustc
        {
            result.rustc.version = await this._exec('rustc -V');
            const match = result.rustc.version.match(/^rustc ([0-9]+\.[0-9]+\.[0-9]+)/);
            if (match) {
                result.rustc.valid = compareVersions(match[1], '1.67.0') >= 0;
            }
        }
        
        // cargo
        {
            result.cargo.version = await this._exec('cargo --version');
            const match = result.cargo.version.match(/^cargo ([0-9]+\.[0-9]+\.[0-9]+)/);
            if (match) {
                result.cargo.valid = compareVersions(match[1], '1.67.0') >= 0;
            }
        }
        
        // cargo contract
        {
            result.contract.version = await this._exec('cargo contract --version');
            const match = result.contract.version.match(/^cargo-contract-contract ([0-9]+\.[0-9]+\.[0-9]+)/);
            if (match) {
                result.contract.valid = compareVersions(match[1], '2.0.0') >= 0;
            }
        }
        
        // wasm32
        {
            const targets = await this._exec('rustup target list');
            const match = targets.match(/wasm32-unknown-unknown/);
            if (match) {
                result.wasm32 = true;
            }
        }
        
        result.valid = result.rustc.valid
            && result.cargo.valid
            && result.contract.valid
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
