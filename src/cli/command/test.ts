import { Context } from '@/Context';
import { Command } from 'commander';
import glob from 'glob';
import { MochaOptions } from 'mocha';
import path from 'path';


async function command (context : Context)
{
    context.logger.log('Running tests');
    
    const { default: Mocha } = await import('mocha');
    
    const mochaConfig : MochaOptions = {
        timeout: 10000,
        ...context.config.mocha
    };
    const mocha = new Mocha(mochaConfig);
    
    // add internals
    mocha.addFile(path.join(context.libPath, '/etc/mocha.global.ts'));
    
    // grep test files
    const patterns = [
        'test?(s)/**/*.@(test|spec).@(ts|js)',
    ];
    for (const pattern of patterns) {
        const files = glob.sync(pattern, { cwd: context.projectDir });
        files.forEach(file => mocha.addFile(file));
    }
    
    const failures = await new Promise<number>((resolve) => {
        mocha.run(resolve);
    });
    
    mocha.dispose();
}

export function testCommand (
    program : Command,
    context : Context
)
{
    program.command('test')
        .description('Start tests')
        .action(async() => command(context));
}
