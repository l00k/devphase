import { Flipper } from '@/typings/Flipper';
import { ContractType, DevPhase, RuntimeContext, TxHandler, waitFor } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';


export default async function(
    runtimeContext : RuntimeContext,
    devPhase : DevPhase
) {
    const asAccount : string = 'alice';
    
    const signer : any = typeof asAccount === 'string'
        ? devPhase.accounts[asAccount]
        : asAccount;
    
    const cert = await PhalaSdk.signCertificate({ pair: signer });
    
    
    const flipperFactory : Flipper.Factory = await devPhase.getFactory('flipper', {
        contractType: ContractType.InkCode,
    });
    
    // upload contract code
    await flipperFactory.deploy({
        autoDeposit: true,
        asAccount,
    });
    
    // instantiate
    const contract : Flipper.Contract = await flipperFactory.instantiate(
        'new',
        [ false ],
        { asAccount }
    );
    
    console.log(
        'Contract ID:',
        contract.address.toHex()
    );
    
    // check value
    {
        const { output } = await contract.query.get(signer.address, { cert });
        console.log(output.toHuman());
    }

    // exec tx
    const { gasRequired, storageDeposit } = await contract.query.flip(signer.address, { cert })
    
    const { status } = await TxHandler.handle(
        contract.tx.flip({
            gasLimit: gasRequired
        }),
        signer,
        true
    );
    console.log(status.toHuman());

    // check value again
    {
        await waitFor(async() => {
            const { output } = await contract.query.get(signer.address, { cert });
            const result = output.toHuman();
            
            console.log(result);
            
            return result.Ok;
        }, 10 * devPhase.blockTime);
    }
}
