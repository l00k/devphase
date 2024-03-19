import { ContractType } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { stringToHex } from '@polkadot/util';
import { {{ContractName}} } from "@/typings/{{ContractName}}";

describe('{{ContractName}}', () => {
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

        it('Should be able...', async function() {
            const response = await contract.query.proxy(signer.address, { cert }, 'https://wttr.in/berlin?ATm');
            console.log(response.output.toJSON());
        });
    });
});
