import { ContractType } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { stringToHex } from '@polkadot/util';
import { Signing } from "@/typings/Signing";

describe("Signing test", () => {
    let factory: Signing.Factory;
    let contract: Signing.Contract;
    let signer: KeyringPair;
    let certificate : PhalaSdk.CertificateData;

    before(async function() {
        factory = await this.devPhase.getFactory(
            './contracts/signing/target/ink/signing.contract',
            { contractType: ContractType.InkCode }
        );

        await factory.deploy();

        signer = this.devPhase.accounts.bob;
        certificate = await PhalaSdk.signCertificate({
            api: this.api,
            pair: signer,
        });
    });

    describe('new constructor', () => {
        before(async function() {
            contract = await factory.instantiate('default', []);
        });
        const message = 'hi, how are ya?';

        it('Should be able derive keypair & sign/verify messages', async function() {
            const response = await contract.query.test(certificate, {});
            console.log(response.output.toJSON());
        });

        it('Should be able derive keypair & sign/verify messages', async function() {
            const signResponse = await contract.query.sign(certificate, {}, message);
            const signMessage = signResponse.output.toJSON().ok;
            console.log(signResponse.output.toJSON());
            const verifyResponse = await contract.query.verify(certificate, {}, signMessage);
            expect(verifyResponse.output.toJSON()).to.be.eql({ok: true});
        });
    });
});
