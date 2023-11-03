import { QjsTest } from '@/typings/QjsTest';
import { ContractFactory, ContractType, TxHandler, waitFor } from '@devphase/service';
import * as PhalaSdk from '@phala/sdk';
import type { KeyringPair } from '@polkadot/keyring/types';


describe('QjsTest', () => {
    let qjsFactory : ContractFactory;
    
    let testFactory : QjsTest.Factory;
    let testContract : QjsTest.Contract;
    
    let suKey : KeyringPair;
    let suCert : PhalaSdk.CertificateData;
    
    let userKey : KeyringPair;
    let userCert : PhalaSdk.CertificateData;
    
    
    before(async function() {
        suKey = this.devPhase.accounts.alice, this.devPhase.accounts.alice;
        suCert = await PhalaSdk.signCertificate({ pair: suKey });
        
        userKey = this.devPhase.accounts.alice, this.devPhase.accounts.bob;
        userCert = await PhalaSdk.signCertificate({ pair: userKey });
        
        qjsFactory = await this.devPhase.getFactory(
            'qjs',
            { contractType: ContractType.IndeterministicInkCode }
        );
        
        testFactory = await this.devPhase.getFactory(
            'qjs_test',
            { contractType: ContractType.InkCode }
        );
        
        // stake funds
        await TxHandler.handle(
            this.api.tx
                .phalaPhatContracts.transferToCluster(
                100e12,
                this.devPhase.mainClusterId,
                userKey.address
            ),
            userKey,
            true
        );
        
        // deploy qjs
        await qjsFactory.deploy();
        
        // register the qjs to JsDelegate driver
        const systemContract = await this.devPhase.getSystemContract();
        
        await TxHandler.handle(
            systemContract.tx['system::setDriver'](
                { gasLimit: '10000000000000' },
                'JsDelegate',
                qjsFactory.metadata.source.hash
            ),
            suKey,
            true,
        );
        
        await waitFor(async() => {
            const { output } = await systemContract.query['system::getDriver'](
                suKey.address,
                { cert: suCert },
                'JsDelegate'
            );
            return !output.isEmpty;
        }, 10_000);
        
        // deploy qjsTest
        await testFactory.deploy({ asAccount: userKey });
    });
    
    describe('default constructor', () => {
        beforeEach(async function() {
            testContract = await testFactory.instantiate('default', [], { asAccount: userKey });
        });
        
        it('Should be able to run JS', async function() {
            const { output } = await testContract.query.run(userKey.address, { cert: userCert }, [ 'foobar' ]);
            
            const _enum = output.asOk.toJSON();
            const _inner = JSON.parse(_enum.string);
            
            expect(_inner).to.be.eql([ 'foobar' ]);
        });
    });
    
});
