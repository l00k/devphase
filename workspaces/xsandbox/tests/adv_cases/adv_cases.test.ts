import { AdvCases } from '@/typings/AdvCases';
import { ContractType } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';


describe('Adv cases', () => {
    let factory : AdvCases.Factory;
    let contract : AdvCases.Contract;
    let signer : KeyringPair;
    let cert : PhalaSdk.CertificateData;
    
    before(async function() {
        signer = this.devPhase.accounts.bob;
        cert = await PhalaSdk.signCertificate({ pair: signer });
    });
    
    beforeEach(async function() {
        factory = await this.devPhase.getFactory(
            'adv_cases',
            { contractType: ContractType.InkCode }
        );
        
        await factory.deploy();
    });
    
    describe('default constructor', () => {
        beforeEach(async function() {
            contract = await factory.instantiate('default', []);
        });
        
        it('Getting sample user', async function() {
            const response = await contract.query.getUser(signer.address, { cert }, 3);
            
            const native = response.output.toJSON();
            console.dir(native, { depth: 10 });
            
            const human = response.output.toHuman();
            console.dir(human, { depth: 10 });
        });
    });
    
});
