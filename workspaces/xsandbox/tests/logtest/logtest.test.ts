import { Logtest } from '@/typings/Logtest';
import { ContractType } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';


describe('LogTest', () => {
    let factory : Logtest.Factory;
    let contract : Logtest.Contract;
    let signer : KeyringPair;
    let cert : PhalaSdk.CertificateData;
    
    before(async function() {
        signer = this.devPhase.accounts.alice;
        cert = await PhalaSdk.signCertificate({ pair: signer });
    });
    
    beforeEach(async function() {
        factory = await this.devPhase.getFactory(
            'logtest',
            { contractType: ContractType.InkCode }
        );
        
        await factory.deploy();
    });
    
    describe('default constructor', () => {
        beforeEach(async function() {
            contract = await factory.instantiate('default', []);
        });
        
        it('Should be created with proper intial value', async function() {
            const response = await contract.query.get(signer.address, { cert });
            expect(response.output.toJSON()).to.be.eql({ ok: false });
        });
    });
    
});
