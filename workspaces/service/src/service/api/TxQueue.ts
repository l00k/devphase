import { Exception } from '@/utils/Exception';
import { sleep } from '@/utils/sleep';
import { ApiPromise } from '@polkadot/api';
import type { SubmittableExtrinsic } from '@polkadot/api/types';
import { KeyringPair } from '@polkadot/keyring/types';
import type { ISubmittableResult } from '@polkadot/types/types';


export class TxQueue
{
    
    protected _api : ApiPromise;
    
    public nonceTracker : Record<number, any> = {};
    
    
    public constructor (api)
    {
        this._api = api;
    }
    
    public async nextNonce (address)
    {
        const byCache = this.nonceTracker[address] || 0;
        const byRpc = (
            await this._api.rpc.system.accountNextIndex(address)
        ).toNumber();
        
        return Math.max(byCache, byRpc);
    }
    
    protected _markNonceFailed (address, nonce)
    {
        if (!this.nonceTracker[address]) {
            return;
        }
        if (nonce < this.nonceTracker[address]) {
            this.nonceTracker[address] = nonce;
        }
    }
    
    async submit (
        transaction : SubmittableExtrinsic<any>,
        signer : KeyringPair,
        waitForFinalization = false
    ) : Promise<ISubmittableResult>
    {
        const address = signer.address;
        
        let nonce = await this.nextNonce(address);
        this.nonceTracker[address] = nonce + 1;
        
        const submit : any = () => new Promise(async(resolve, reject) => {
            try {
                await transaction
                    .signAndSend(signer, { nonce }, (result, extra) => {
                        if (result.status.isInBlock) {
                            for (const e of result.events) {
                                const { event: { data, method, section } } = e;
                                if (section === 'system' && method === 'ExtrinsicFailed') {
                                    reject(result);
                                }
                            }
                            if (!waitForFinalization) {
                                resolve(result);
                            }
                        }
                        if (result.status.isFinalized) {
                            resolve(result);
                        }
                        if (result.status.isInvalid) {
                            reject(result);
                        }
                    });
            }
            catch (e) {
                reject(e);
            }
        });
        
        for (let i=0; i<200; ++i) {
            try {
                return await submit();
            }
            catch (e : any) {
                if (e?.message) {
                    if (e.message.includes('Priority is too low')) {
                        // try again
                        await sleep(50);
                        continue;
                    }
                    else if(e.message.includes('Transaction is outdated')) {
                        // increase nonce
                        nonce = await this.nextNonce(address);
                        this.nonceTracker[address] = nonce + 1;
                    
                        // try again
                        await sleep(50);
                        continue;
                    }
                }
                
                throw e;
            }
        }
        
        throw new Exception(
            'Could not execute extrinsic',
            1675571324720
        );
    }
}
