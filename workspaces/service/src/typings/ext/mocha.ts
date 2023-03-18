import { DevPhase } from '@/service/api/DevPhase';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { StackManager } from '@/service/project/StackManager';
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
