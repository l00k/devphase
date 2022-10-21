import { ApiPromise } from '@polkadot/api';
import { DevPhase } from '@/DevPhase';
import { Context } from '@/Context';

type devPhaseContext = Context;

declare module 'mocha'
{
    export interface Context
    {
        // @ts-ignore
        context : devPhaseContext;
        // @ts-ignore
        devPhase : DevPhase;
        api : ApiPromise;
    }
}
