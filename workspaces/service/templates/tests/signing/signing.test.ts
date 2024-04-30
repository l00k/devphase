import { ContractType } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { stringToHex } from '@polkadot/util';
import { {{ContractName}} } from "@/typings/{{ContractName}}";

describe("{{ContractName}}", () => {
    let factory: {{ContractName}}.Factory;
    let contract: {{ContractName}}.Contract;
    let signer: KeyringPair;
    let cert : PhalaSdk.CertificateData;

    before(async function() {
        signer = this.devPhase.accounts.bob;
        cert = await PhalaSdk.signCertificate({ pair: signer });
        
        factory = await this.devPhase.getFactory(
            '{{contract_name}}',
            { contractType: ContractType.InkCode }
        );

        await factory.deploy();
        
        await this.devPhase.ensureFundsInCluster(signer);
    });

    describe('new constructor', () => {
        before(async function() {
            contract = await factory.instantiate('default', []);
        });
        const message = 'hi, how are ya?';

        it('Should be able derive keypair & sign/verify messages', async function() {
            const response = await contract.query.test(signer.address, { cert });
            console.log(response.output.toJSON());
        });

        it('Should be able derive keypair & sign/verify messages', async function() {
            const signResponse = await contract.query.sign(signer.address, { cert }, message);
            const signMessage = signResponse.output.toJSON().ok;
            console.log(signResponse.output.toJSON());
            const verifyResponse = await contract.query.verify(signer.address, { cert }, signMessage);
            expect(verifyResponse.output.toJSON()).to.be.eql({ok: true});
        });
    });
});
