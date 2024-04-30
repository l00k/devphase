import { {{ContractName}} } from '@/typings/{{ContractName}}';
import { ContractType, TxHandler, waitFor } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';


describe('{{ContractName}}', () => {
    let factory : {{ContractName}}.Factory;
    let contract : {{ContractName}}.Contract;
    let signer : KeyringPair;
    let cert : PhalaSdk.CertificateData;
    
    before(async function() {
        // pick any account with high enough PHA balance
        signer = this.devPhase.accounts.bob;
        
        // sign cert for picked user
        cert = await PhalaSdk.signCertificate({ pair: signer });
        
        // ensure there is enough funds in cluster
        await this.devPhase.ensureFundsInCluster(signer);
    });
    
    beforeEach(async function() {
        // create contract factory
        factory = await this.devPhase.getFactory(
            '{{contract_name}}',
            { contractType: ContractType.InkCode }
        );
        
        // deploy using picked account
        await factory.deploy({ asAccount: signer });
    });
    
    describe('default constructor', () => {
        beforeEach(async function() {
            // each time instantiate new instance
            contract = await factory.instantiate('default', [], { asAccount: signer });
        });
        
        it('Should be created with proper intial value', async function() {
            // query current value
            const response = await contract.query.get(signer.address, { cert });
            expect(response.output.toJSON()).to.be.eql({ ok: false });
        });
        
        it('Should be able to flip value', async function() {
            // prepare flip transaction
            const tx = contract.tx.flip({
                gasLimit: 10e12
            });
            
            // submit and wait for finalization
            const result = await TxHandler.handle(
                tx,
                signer,
                true
            );
            
            // wait for actual state change
            // it is delayed because worker need to process state change submitted onchain
            await waitFor(async() => {
                const response = await contract.query.get(signer.address, { cert });
                const output = response.output.toJSON();
                return output.ok;
            }, 10_000);
        });
    });
    
    describe('new constructor', () => {
        beforeEach(async function() {
            contract = await factory.instantiate('new', [ true ]);
        });
        
        it('Should be created with proper intial value', async function() {
            const response = await contract.query.get(signer.address, { cert });
            expect(response.output.toJSON()).to.be.eql({ ok: true });
        });
    });
    
});
