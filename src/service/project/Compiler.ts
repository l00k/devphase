import { RunMode, VerbosityLevel } from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import { ux } from '@oclif/core';
import chalk from 'chalk';
import childProcess from 'child_process';
import * as fs from 'fs';
import path from 'path';


export type CompilationResult = {
    result : boolean,
    path? : string,
}


export class Compiler
{
    
    protected _logger : Logger = new Logger('Compiler');
    
    
    public constructor (
        protected _runtimeContext : RuntimeContext
    )
    {}
    
    public async compile (
        contractName : string,
        releaseMode : boolean
    ) : Promise<CompilationResult>
    {
        const contractPath = path.join(
            this._runtimeContext.paths.contracts,
            contractName
        );
        const artifactsDirPath = path.join(
            this._runtimeContext.paths.artifacts,
            contractName
        );
        
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
        
        const displayLogs = this._runtimeContext.verbosity == VerbosityLevel.Verbose;
        
        // analyzing contracts output
        let outputDirectory : string;
        let compilationTextOutput = '';
        
        const analyzeOutput = (text : string) => {
            const lines = text.split('\n').map(line => line.trim());
            const lineIdx = lines
                .findIndex(line => line.includes('Your contract artifacts are ready'));
            if (lineIdx !== -1) {
                outputDirectory = lines[lineIdx + 1];
            }
            
            compilationTextOutput += text;
            
            if (displayLogs) {
                console.log(chalk.blueBright('[Compiler]'));
                process.stdout.write(text);
            }
        };
        
        child.stdout.setEncoding('utf-8');
        child.stderr.setEncoding('utf-8');
        
        child.stdout.on('data', analyzeOutput);
        child.stderr.on('data', analyzeOutput);
        
        const resultCode = await new Promise(resolve => {
            child.on('exit', code => resolve(code));
        });
        
        if (resultCode !== 0) {
            this._logger.log(compilationTextOutput);
            this._logger.error('Failed building contract');
            return { result: false };
        }
        
        if (!outputDirectory) {
            this._logger.log(compilationTextOutput);
            this._logger.error('Unable to detect output directory');
            return { result: false };
        }
        
        // create artifacts directory
        if (!fs.existsSync(artifactsDirPath)) {
            fs.mkdirSync(artifactsDirPath, { recursive: true });
        }
        
        // check & copy artifact files
        this._logger.log(chalk.green('Files generated under:'));
        
        const artifactFiles : string[] = [
            `${contractName}.contract`,
            `${contractName}.wasm`,
            'metadata.json',
        ];
        for (const artifactFile of artifactFiles) {
            const sourceArtifactFilePath = path.join(outputDirectory, artifactFile);
            if (!fs.existsSync(sourceArtifactFilePath)) {
                this._logger.error(`File ${artifactFile} not generated under ${sourceArtifactFilePath}`);
                return { result: false };
            }
            
            const artifactFilePath = path.join(artifactsDirPath, artifactFile);
            fs.copyFileSync(
                sourceArtifactFilePath,
                artifactFilePath
            );
            
            this._logger.log(
                path.relative(this._runtimeContext.paths.project, artifactFilePath)
            );
        }
        
        this._logger.log('');
        
        return {
            result: true,
            path: artifactsDirPath
        };
    }
    
}
