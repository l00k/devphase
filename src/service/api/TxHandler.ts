import type { SignerOptions } from '@polkadot/api/submittable/types';
import type { SubmittableExtrinsic } from '@polkadot/api/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ISubmittableResult } from '@polkadot/types/types';


export class TxHandler
{
    
    public static async handle (
        transaction : SubmittableExtrinsic<any>,
        keyringPair : KeyringPair,
        transactionId : string,
        options? : Partial<SignerOptions>
    ) : Promise<ISubmittableResult>
    {
        return new Promise<any>(async(resolve, reject) => {
            const unsub : any = await transaction
                .signAndSend(keyringPair, options, (result, extra) => {
                    if (result.status.isInvalid) {
                        reject(result);
                    }
                    else if (result.status.isDropped) {
                        reject(result);
                    }
                    else if (result.status.isRetracted) {
                        reject(result);
                    }
                    else if (result.status.isInBlock) {
                        resolve(result);
                    }
                    else if (result.status.isUsurped) {
                        reject(result);
                    }
                    
                    if (result.status.isFinalized || result.status.isFinalityTimeout) {
                        resolve(result);
                        unsub();
                    }
                });
        });
    }
    
}
