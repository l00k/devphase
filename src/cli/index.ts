#! /usr/bin/env ts-node-script
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Command } from 'commander';

(async() => {
    const program = new Command();
    
    program
        .name('devPHAse')
        .description('Development tool for Phala Phat contracts')
        .version('0.0.1');
    
    // create context
    const runtimeContext = await RuntimeContext.getSingleton();
    
    // register commands
    const builtInCommands : any = await import('./command');
    for (const commandRegisterFn of Object.values<any>(builtInCommands)) {
        await commandRegisterFn(program, runtimeContext);
    }
    
    program.parse();
})();

