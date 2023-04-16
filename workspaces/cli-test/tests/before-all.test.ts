import { cleanUpContext, requestStackBinaries } from '@/utils';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

(<any>global).expect = chai.expect;


before(async function() {
    this.timeout(3 * 60 * 1000);
    
    await cleanUpContext();
    await requestStackBinaries();
});
