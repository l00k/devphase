import { DevPhase } from '@/service/DevPhase';
import { RuntimeContext } from '@/service/RuntimeContext';
import { StackManager } from '@/service/StackManager';
import { ApiPromise } from '@polkadot/api';

declare module 'mocha'
{
    export interface Context
    {
        // @ts-ignore
        runtimeContext : RuntimeContext;
        // @ts-ignore
        devPhase : DevPhase;
        // @ts-ignore
        stackManager : StackManager;
        api : ApiPromise;
    }
}
