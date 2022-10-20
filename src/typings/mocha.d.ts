import * as devphase from 'devphase';
import { ApiPromise } from '@polkadot/api';

declare module 'mocha'
{
    export interface Context
    {
        context : devphase.Context;
        devPhase : devphase.DevPhase;
        api : ApiPromise;
    }
}
