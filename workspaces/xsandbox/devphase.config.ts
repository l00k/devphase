import type { ProjectConfigOptions } from '@devphase/service';
import { DevPhase } from '@devphase/service';

const config : ProjectConfigOptions = {
    stack: {
        version: 'nightly-2023-03-25',
        blockTime: 1000,
        pruntime: {
            envs: {
                RUST_LOG: 'debug,runtime::contracts=debug'
            }
        }
    },
    testing: {
        blockTime: 100,
    },
};

export default config;
