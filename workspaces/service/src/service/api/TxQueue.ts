import { Exception } from '@/utils/Exception';
import { sleep } from '@/utils/sleep';
import { timeout } from '@/utils/timeout';
import { ApiPromise } from '@polkadot/api';
import type { SubmittableExtrinsic } from '@polkadot/api/types';
import { KeyringPair } from '@polkadot/keyring/types';
import type { ISubmittableResult } from '@polkadot/types/types';


export class TxQueue
{
    
    protected _api : ApiPromise;
    
    protected _nonceTracker : Record<number, any> = {};
    
    
    public constructor (api)
    {
        this._api = api;
    }
    
    public async nextNonce (address)
    {
        const byCache = this._nonceTracker[address] || 0;
        const byRpc = (
            await this._api.rpc.system.accountNextIndex(address)
        ).toNumber();
        
        return Math.max(byCache, byRpc);
    }
    
    protected _markNonceFailed (address, nonce)
    {
        if (!this._nonceTracker[address]) {
            return;
        }
        if (nonce < this._nonceTracker[address]) {
            this._nonceTracker[address] = nonce;
        }
    }
    
    public async submit (
        transaction : SubmittableExtrinsic<'promise'>,
        signer : KeyringPair,
        waitForFinalization = false
    ) : Promise<ISubmittableResult>
    {
        const address = signer.address;
        
        const submit = () => new Promise<ISubmittableResult>(async(resolve, reject) => {
            const nonce = await this.nextNonce(address);
            this._nonceTracker[address] = nonce + 1;
            
            timeout(async() => {
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
                        if (result.status.isDropped) {
                            reject(result);
                        }
                        if (result.status.isUsurped) {
                            reject(result);
                        }
                        if (result.status.isRetracted) {
                            reject(result);
                        }
                        if (result.isError) {
                            reject(result);
                        }
                    }).catch(e => reject(e));
            }, 60_000).catch(e => reject(e));
        });
        
        for (let i=0; i<200; ++i) {
            try {
                return await submit();
            }
            catch (e : any) {
                const msg = typeof e == 'string'
                    ? e.toLowerCase()
                    : e?.message.toString().toLowerCase()
                    ;
            
                if (
                    msg.includes('priority is too low')
                ) {
                    await sleep(50);
                    continue;
                }
                else if(
                    msg.includes('transaction is outdated')
                ) {
                    continue;
                }
                else if (msg.includes('timeout')) {
                    i += 9;
                    continue;
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
