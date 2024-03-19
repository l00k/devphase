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

    before(async function setup(): Promise<void> {
        factory = await this.devPhase.getFactory(
            '{{contract_name}}',
            { contractType: ContractType.InkCode }
        );

        await factory.deploy();

        signer = this.devPhase.accounts.bob;
        cert = await PhalaSdk.signCertificate({ pair: signer });
    });

    describe('default constructor', () => {
        before(async function() {
            contract = await factory.instantiate('default', []);
        });
        const salt = 'hi, how are ya?';

        it('Should be able to add and get cache', async function() {
            const response = await contract.query.getRandomness(signer.address, { cert }, salt);
            console.log(response.output.toJSON());
        });
    });
});
