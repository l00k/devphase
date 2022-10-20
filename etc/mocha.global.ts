import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Context, DevPhase, StartStackMode } from 'devphase';

chai.use(chaiAsPromised);

(<any>global).expect = chai.expect;


before(async function() {
    this.timeout(30 * 1000);
    
    this.context = await Context.getSingleton();
    await this.context.startStack(StartStackMode.Background);
    
    this.devPhase = await DevPhase.setup();
    this.api = this.devPhase.api;
});

after(async function() {
    if (this.devPhase) {
        await this.devPhase.cleanup();
    }
    
    if (this.context) {
        await this.context.stopStack();
    }
});
