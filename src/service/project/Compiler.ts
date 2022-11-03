import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import chalk from 'chalk';
import childProcess from 'child_process';
import * as fs from 'fs';
import path from 'path';


export class Compiler
{
    
    protected _logger = new Logger(Compiler.name);
    
    protected _artifactsBasePath : string;
    protected _contractsBasePath : string;
    
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {
        this._artifactsBasePath = path.join(
            this._runtimeContext.projectDir,
            this._runtimeContext.config.directories.artifacts
        );
        this._contractsBasePath = path.join(
            this._runtimeContext.projectDir,
            this._runtimeContext.config.directories.contracts
        );
    }
    
    public async compile (
        contractName : string,
        releaseMode : boolean
    ) : Promise<boolean>
    {
        const contractPath = path.join(this._contractsBasePath, contractName);
        const artifactsDirPath = path.join(this._artifactsBasePath, contractName);
        
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
        
        // analyzing contracts output
        let outputDirectory : string;
        
        const analyzeOutput = (text : string) => {
            const lines = text.split('\n').map(line => line.trim());
            const lineIdx = lines
                .findIndex(line => line.includes('Your contract artifacts are ready'));
            if (lineIdx !== -1) {
                console.log(lineIdx);
                outputDirectory = lines[lineIdx + 1];
            }
            
            process.stdout.write(text);
        };
        
        child.stdout.setEncoding('utf-8');
        child.stderr.setEncoding('utf-8');
        
        child.stdout.on('data', analyzeOutput);
        child.stderr.on('data', analyzeOutput);
        
        const resultCode = await new Promise(resolve => {
            child.on('exit', code => resolve(code));
        });
        
        if (resultCode !== 0) {
            this._logger.error('Failed building contract');
            return false;
        }
        
        if (!outputDirectory) {
            this._logger.error('Unable to detect output directory');
            return false;
        }
        
        // create artifacts directory
        if (!fs.existsSync(artifactsDirPath)) {
            fs.mkdirSync(artifactsDirPath, { recursive: true });
        }
        
        // check & copy artifact files
        this._logger.log('Files generated under:');
        
        const artifactFiles : string[] = [
            `${contractName}.contract`,
            `${contractName}.wasm`,
            'metadata.json',
        ];
        for (const artifactFile of artifactFiles) {
            const sourceArtifactFilePath = path.join(outputDirectory, artifactFile);
            if (!fs.existsSync(sourceArtifactFilePath)) {
                this._logger.error(
                    'File',
                    artifactFile,
                    'not generated under',
                    sourceArtifactFilePath
                );
                return false;
            }
            
            const artifactFilePath = path.join(artifactsDirPath, artifactFile);
            fs.copyFileSync(
                sourceArtifactFilePath,
                artifactFilePath
            );
            
            console.log(
                path.relative(this._runtimeContext.projectDir, artifactFilePath)
            );
        }
        
        return true;
    }
    
}
