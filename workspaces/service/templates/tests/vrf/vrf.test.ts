import { ContractType } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { stringToHex } from '@polkadot/util';
import { Vrf } from "@/typings/Vrf";

describe("Vrf test", () => {
    let factory: Vrf.Factory;
    let contract: Vrf.Contract;
    let signer: KeyringPair;
    let certificate : PhalaSdk.CertificateData;

    before(async function setup(): Promise<void> {
        factory = await this.devPhase.getFactory(
            './contracts/vrf/target/ink/vrf.contract',
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
        const salt = 'hi, how are ya?';

        it('Should be able to add and get cache', async function() {
            const response = await contract.query.getRandomness(certificate, {}, salt);
            console.log(response.output.toJSON());
        });
    });
});