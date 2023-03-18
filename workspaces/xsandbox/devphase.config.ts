import type { ProjectConfigOptions } from '@devphase/service';
import { DevPhase } from '@devphase/service';

const config : ProjectConfigOptions = {
    stack: {
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
