import { Exception } from '@/utils/Exception';
import { sleep } from '@/utils/sleep';
import type { SubmittableExtrinsic } from '@polkadot/api/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ISubmittableResult } from '@polkadot/types/types';


export class TxHandler
{
    
    public static async handle (
        transaction : SubmittableExtrinsic<any>,
        signer : KeyringPair,
        waitForFinalization : boolean = false
    ) : Promise<ISubmittableResult>
    {
        const submit : any = () => new Promise(async(resolve, reject) => {
            try {
                await transaction
                    .signAndSend(signer, {}, (result, extra) => {
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
