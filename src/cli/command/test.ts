import { RunMode } from '@/def';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Logger } from '@/utils/Logger';
import { Command } from 'commander';
import glob from 'glob';
import { MochaOptions } from 'mocha';
import path from 'path';


async function command (
    runtimeContext : RuntimeContext,
    network : string
)
{
    const logger = new Logger('Test');
    
    logger.log('Running tests');
    
    await runtimeContext.initContext(RunMode.Testing, network);
    runtimeContext.requestProjectDirectory();
    await runtimeContext.requestStackBinaries();
    
    const { default: Mocha } = await import('mocha');
    
    const mochaConfig : MochaOptions = {
        timeout: 10000,
        ...runtimeContext.config.testing.mocha
    };
    const mocha = new Mocha(mochaConfig);
    
    // add internals
    mocha.addFile(
        path.join(
            runtimeContext.paths.devphase,
            '/etc/mocha.global.ts'
        )
    );
    
    // grep test files
    const patterns = [
        `${runtimeContext.config.directories.tests}/**/*.@(test|spec).@(ts|js)`,
    ];
    
    for (const pattern of patterns) {
        const files = glob.sync(pattern, { cwd: runtimeContext.paths.project });
        files.forEach(file => mocha.addFile(file));
    }
    
    await new Promise<number>((resolve) => {
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
        .option('-n, --network <network>', 'Network key', 'local')
        .action((options) => command(context, options.network));
}
