import type { ProjectConfigOptions } from '@devphase/service';
import { DevPhase } from '@devphase/service';

const config : ProjectConfigOptions = {
    stack: {
        blockTime: 100,
        pruntime: {
            envs: {
                RUST_LOG: 'debug,runtime::contracts=debug'
            }
        }
    }
};

export default config;
