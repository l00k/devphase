import { ContractType, TxHandler } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { stringToHex } from '@polkadot/util';
import { PhatStorage } from "@/typings/PhatStorage";

describe("PhatStorage test", () => {
    let factory: PhatStorage.Factory;
    let contract: PhatStorage.Contract;
    let signer: KeyringPair;
    let certificate : PhalaSdk.CertificateData;

    before(async function setup(): Promise<void> {
        factory = await this.devPhase.getFactory(
            './contracts/phat_storage/target/ink/phat_storage.contract',
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
            contract = await factory.instantiate('new', []);
        });

        it('Should be able to seal keys', async function() {
            await TxHandler.handle(contract.tx.sealKeys(
                    { gasLimit: "10000000000000" },
                    "ACCESS_KEY",
                    "SECRET_KEY"
                ),
                signer,
                true
            );
            const response = await contract.query.itWorks(certificate, {});
            console.log(response);
            const getResp = await contract.query.s3Get(certificate, {}, "s3.us-west-1.amazonaws.com", "us-west-1", "wrlx-aws-s3", "path/to/foo");
            console.log(getResp);
        });
        it('Should be able to perform put to s3 bucket and get object key value', async function() {
            const putResp = await contract.query.s3Put(certificate, {}, "s3.us-west-1.amazonaws.com", "us-west-1", "wrlx-aws-s3", "path/to/foo", 'bar');
            console.log(putResp.output.toJSON());
            const getResp = await contract.query.s3Get(certificate, {}, "s3.us-west-1.amazonaws.com", "us-west-1", "wrlx-aws-s3", "path/to/foo");
            console.log(`Object Key: ["path/to/foo"] -> Value: ${getResp.output.toJSON().ok.ok.toString()}`);
        });
        it('Should be able to delete object key value from bucket', async function() {
            const putResp = await contract.query.s3Delete(certificate, {}, "s3.us-west-1.amazonaws.com", "us-west-1", "wrlx-aws-s3", "path/to/foo");
            console.log(putResp.output.toJSON());
            const getResp = await contract.query.s3Get(certificate, {}, "s3.us-west-1.amazonaws.com", "us-west-1", "wrlx-aws-s3", "path/to/foo");
            console.log(`Object Key: ["path/to/foo"] -> Value: ${getResp}`);
        });
    });
});