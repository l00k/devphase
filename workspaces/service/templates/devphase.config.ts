import type { ProjectConfigOptions } from '@devphase/service';

const config : ProjectConfigOptions = {
    stack: {
        version: 'latest', // version which you want to pull from official repository (tag name) or "latest" one
        blockTime: 250, // default block time for running local stack
    },
    testing: {
        mocha: {}, // custom mocha configuration
        blockTime: 100, // overrides block time specified in node (and pherry) component
        stackSetupConfig: { // environment setup
            setup: {
                custom: undefined, // custom setup procedure callback; (devPhase) => Promise<void>
                timeout: 60 * 1000,
            },
            teardown: {
                custom: undefined, // custom teardown procedure callback ; (devPhase) => Promise<void>
                timeout: 10 * 1000,
            }
        },
        stackLogOutput: false, // if specifed pipes output of all stack component to file (by default it is ignored)
    }
};

export default config;
