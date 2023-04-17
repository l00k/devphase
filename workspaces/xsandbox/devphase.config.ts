import type { ProjectConfigOptions } from '@devphase/service';

const config : ProjectConfigOptions = {
    stack: {
        blockTime: 100,
        pruntime: {
            envs: {
                RUST_LOG: 'debug,runtime::contracts=debug'
            }
        }
    },
    testing: {
        blockTime: 100,
    }
};

export default config;
