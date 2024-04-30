import { {{ContractName}} } from '@/typings/{{ContractName}}';
import { ContractType } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';
import { stringToHex } from '@polkadot/util';


describe('{{ContractName}}', () => {
    let factory : {{ContractName}}.Factory;
    let contract : {{ContractName}}.Contract;
    let signer : KeyringPair;
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
            contract = await factory.instantiate('new', []);
        });
        const address = '0xD0fE316B9f01A3b5fd6790F88C2D53739F80B464';
        const hex_address = stringToHex(address);

        it('Should be able to query balance of an account on Ethereum', async function() {
            const response = await contract.query.getEthBalance(signer.address, { cert }, hex_address);
            const human = response.output.toHuman();
            const primitive = response.output.toPrimitive();
            const json = response.output.toJSON();

            console.log(human.Ok.Ok);
            console.log(primitive.ok.ok);
            console.log(json.ok.ok);
        });
    });

});
