import { LogTest } from '@/typings/LogTest';
import { ContractType, TxHandler, waitFor } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';


describe('LogTest', () => {
    let factory : LogTest.Factory;
    let contract : LogTest.Contract;
    let signer : KeyringPair;
    let cert : PhalaSdk.CertificateData;
    
    before(async function() {
        signer = this.devPhase.accounts.bob;
        cert = await PhalaSdk.signCertificate({ pair: signer });
        
        await TxHandler.handle(
            this.api.tx
                .phalaPhatContracts.transferToCluster(
                    100e12,
                    this.devPhase.mainClusterId,
                    signer.address
                ),
            signer,
            true
        );
    });
    
    beforeEach(async function() {
        factory = await this.devPhase.getFactory(
            'log_test',
            { contractType: ContractType.InkCode }
        );
        
        await factory.deploy({ asAccount: signer });
    });
    
    describe('default constructor', () => {
        beforeEach(async function() {
            contract = await factory.instantiate('default', [], { asAccount: signer });
        });
        
        it('Should be created with proper intial value', async function() {
            const response = await contract.query.get(signer.address, { cert });
            expect(response.output.toJSON()).to.be.eql({ ok: false });
        });
        
        it('Should be able to flip value', async function() {
            const tx = contract.tx.flip({
                gasLimit: 10e12
            });
            
            const result = await TxHandler.handle(
                tx,
                signer,
                true
            );
            
            await waitFor(async() => {
                const response = await contract.query.get(signer.address, { cert });
                const output = response.output.toJSON();
                return output.ok;
            }, 10_000);
        });
    });
    
});
