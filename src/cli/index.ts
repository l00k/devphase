#! /usr/bin/env ts-node-script
import { Context } from '@/cli/Context';
import { Command } from 'commander';
import path from 'path';

(async() => {
    const program = new Command();
    
    program
        .name('devPHAse')
        .description('Development tool for Phala Phat contracts')
        .version('0.0.1');
    
    // create context
    const context = await Context.create();
    
    // register commands
    const builtInCommands : any = await import('./command');
    for (const commandRegisterFn of Object.values<any>(builtInCommands)) {
        await commandRegisterFn(program, context);
    }
    
    program.parse();
})();

