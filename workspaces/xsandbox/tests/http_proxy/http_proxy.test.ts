import { HttpProxy } from '@/typings/HttpProxy';
import { ContractType } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';


describe('Http proxy', () => {
    let factory : HttpProxy.Factory;
    let contract : HttpProxy.Contract;
    let signer : KeyringPair;
    let cert : PhalaSdk.CertificateData;
    
    before(async function() {
        factory = await this.devPhase.getFactory(
            'http_proxy',
            { contractType: ContractType.InkCode }
        );
        
        await factory.deploy();
        
        signer = this.devPhase.accounts.bob;
        cert = await PhalaSdk.signCertificate({ pair: signer });
        
        contract = await factory.instantiate('new', []);
    });
    
    describe('default constructor', () => {
        it('Proper execute request using GET method', async function() {
            const { output } = await contract.query.request(signer.address, { cert }, {
                method: 'GET',
                url: 'https://httpbin.org/anything',
                body: null,
                headers: [],
            });
            
            const response = output.toJSON();
            
            expect(response.err).to.be.undefined;
            expect(response.ok.statusCode).to.be.equal(200);
            
            const body = JSON.parse(
                Buffer.from(response.ok.body.toString().slice(2), 'hex').toString('utf-8')
            );
            expect(body).to.not.be.undefined;
            expect(body.method).to.be.equal('GET');
            expect(body.url).to.be.equal('https://httpbin.org/anything');
        });
        
        it('Proper execute request using POST method', async function() {
            const { output } = await contract.query.request(signer.address, { cert }, {
                method: 'POST',
                url: 'https://httpbin.org/anything',
                body: '0x' + Buffer.from(JSON.stringify({ ok: 123 })).toString('hex'),
                headers: [],
            });
            
            const response = output.toJSON();
            
            expect(response.err).to.be.undefined;
            expect(response.ok.statusCode).to.be.equal(200);
            
            const body = JSON.parse(
                Buffer.from(response.ok.body.toString().slice(2), 'hex').toString('utf-8')
            );
            
            expect(body).to.not.be.undefined;
            expect(body.method).to.be.equal('POST');
            expect(body.url).to.be.equal('https://httpbin.org/anything');
            expect(body.json).to.be.eql({ ok: 123 });
        });
    });
    
});
