import { ContractTypeBinder } from '@/service/ContractTypeBinder';
import { RuntimeContext } from '@/service/RuntimeContext';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import childProcess from 'child_process';
import * as fs from 'fs';
import path from 'path';


export class ContractCompiler
{
    
    protected _logger = new Logger('ContractCompiler');
    protected _contractTsBinder : ContractTypeBinder;
    
    public contractsBasePath : string;
    
    public constructor (
        public runtimeContext : RuntimeContext
    )
    {
        this.contractsBasePath = path.join(
            this.runtimeContext.projectDir,
            this.runtimeContext.config.directories.contracts
        );
        
        this._contractTsBinder = new ContractTypeBinder(runtimeContext);
    }
    
    public async compile (
        contractName : string,
        releaseMode : boolean
    ) : Promise<boolean>
    {
        const contractPath = path.join(this.contractsBasePath, contractName);
        
        this._logger.log('Building:', chalk.blueBright(contractName));
        
        const args = [ '+nightly', 'contract', 'build' ];
        if (releaseMode) {
            args.push('--release');
        }
        
        const child = await childProcess.spawn(
            'cargo',
            args,
            {
                cwd: contractPath,
            }
        );
        
        child.stdout.setEncoding('utf-8');
        child.stderr.setEncoding('utf-8');
        
        child.stdout.on('data', text => process.stdout.write(text));
        child.stderr.on('data', text => process.stdout.write(text));
        
        const resultCode = await new Promise(resolve => {
            child.on('exit', code => resolve(code));
        });
        
        if (resultCode !== 0) {
            this._logger.error('Failed building contract');
            return false;
        }
        
        // check files
        const filesToCheck = [
            path.join(contractPath, 'target', 'ink', `${contractName}.contract`),
            path.join(contractPath, 'target', 'ink', `${contractName}.wasm`),
            path.join(contractPath, 'target', 'ink', 'metadata.json'),
        ];
        for (const fileToCheck of filesToCheck) {
            if (!fs.existsSync(fileToCheck)) {
                this._logger.error('File', fileToCheck, 'not generated');
                return false;
            }
        }
        
        this._logger.log(
            'Files generated under',
            filesToCheck.map(file => path.relative(this.runtimeContext.projectDir, file))
        );
        
        return true;
    }
    
}
