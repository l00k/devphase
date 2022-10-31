import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import { Command } from 'commander';
import glob from 'glob';
import { MochaOptions } from 'mocha';
import path from 'path';


async function command (runtimeContext : RuntimeContext)
{
    const logger = new Logger('Test');
    
    logger.log('Running tests');
    
    const { default: Mocha } = await import('mocha');
    
    const mochaConfig : MochaOptions = {
        timeout: 10000,
        ...runtimeContext.config.mocha
    };
    const mocha = new Mocha(mochaConfig);
    
    // add internals
    mocha.addFile(path.join(runtimeContext.libPath, '/etc/mocha.global.ts'));
    
    // grep test files
    const patterns = [
        `${runtimeContext.config.directories.tests}/**/*.@(test|spec).@(ts|js)`,
    ];
    
    for (const pattern of patterns) {
        const files = glob.sync(pattern, { cwd: runtimeContext.projectDir });
        files.forEach(file => mocha.addFile(file));
    }
    
    const failures = await new Promise<number>((resolve) => {
        mocha.run(resolve);
    });
    
    mocha.dispose();
}

export function testCommand (
    program : Command,
    context : RuntimeContext
)
{
    program.command('test')
        .description('Start tests')
        .action(async(...args : any[]) => command(context));
}
