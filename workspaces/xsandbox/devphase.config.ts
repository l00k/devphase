import type { ProjectConfigOptions } from '@devphase/service';

const config : ProjectConfigOptions = {
    stack: {
        blockTime: 50,
        pruntime: {
            envs: {
                RUST_LOG: 'debug,runtime::contracts=debug'
            }
        }
    },
    testing: {
        blockTime: 50,
    }
};

export default config;
