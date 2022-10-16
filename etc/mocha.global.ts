import { DevPhase } from 'devphase';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

(<any> global).expect = chai.expect;


before(async function() {
    this.timeout(30 * 1000);

    this.devPhase = await DevPhase.setup();
    this.api = this.devPhase.api;
});

after(async function() {
    await this.devPhase.cleanup();
})
