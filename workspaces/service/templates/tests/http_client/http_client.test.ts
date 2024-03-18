import { ContractType } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { stringToHex } from '@polkadot/util';
import { HttpClient } from "@/typings/HttpClient";

describe("HttpClient test", () => {
    let factory: HttpClient.Factory;
    let contract: HttpClient.Contract;
    let signer: KeyringPair;
    let certificate : PhalaSdk.CertificateData;

    before(async function setup(): Promise<void> {
        factory = await this.devPhase.getFactory(
            './contracts/http_client/target/ink/http_client.contract',
            { contractType: ContractType.InkCode }
        );

        await factory.deploy();

        signer = this.devPhase.accounts.bob;
        certificate = await PhalaSdk.signCertificate({
            api: this.api,
            pair: signer,
        });
    });

    describe('default constructor', () => {
        before(async function() {
            contract = await factory.instantiate('default', []);
        });

        it('Should be able...', async function() {
            const response = await contract.query.proxy(certificate, {}, 'https://wttr.in/berlin?ATm');
            console.log(response.output.toJSON());
        });
    });
});