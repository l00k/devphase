import { ContractType } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { stringToHex } from '@polkadot/util';
import { UseCache } from "@/typings/UseCache";

describe("UseCache test", () => {
    let factory: UseCache.Factory;
    let contract: UseCache.Contract;
    let signer: KeyringPair;
    let certificate : PhalaSdk.CertificateData;

    before(async function setup(): Promise<void> {
        factory = await this.devPhase.getFactory(
            './contracts/use_cache/target/ink/use_cache.contract',
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
        const message = 'hi, how are ya?';

        it('Should be able to add and get cache', async function() {
            const response = await contract.query.setKeyValue(certificate, {}, message);
            console.log(response.output.toJSON());
            const getResponse = await contract.query.getKeyValue(certificate, {});
            console.log(getResponse.output.toJSON());
        });
    });
});