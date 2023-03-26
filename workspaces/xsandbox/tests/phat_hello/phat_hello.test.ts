import { PhatHello } from '@/typings/PhatHello';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { ContractType } from '@devphase/service';


describe('PhatHello', () => {
    let factory : PhatHello.Factory;
    let contract : PhatHello.Contract;
    let signer : KeyringPair;
    let certificate : PhalaSdk.CertificateData;

    before(async function() {
        factory = await this.devPhase.getFactory(
            './contracts/phat_hello/target/ink/phat_hello.contract',
            {
                contractType: ContractType.InkCode,
            }
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
            contract = await factory.instantiate('new', {});
        });

        it('Should be able to query balance of an account on Ethereum', async function() {
            const response = await contract.query.get_eth_balance(certificate, ['0xD0fE316B9f01A3b5fd6790F88C2D53739F80B464']);
            console.log(response.output.toJSON());
        });
    });

});
