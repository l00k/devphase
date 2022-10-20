import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Context, DevPhase, StartStackMode } from 'devphase';

chai.use(chaiAsPromised);

(<any>global).expect = chai.expect;


before(async function() {
    this.timeout(30 * 1000);
    
    this.context = await Context.getSingleton();
    
    this.context.logger.log('Global setup start');
    
    await this.context.startStack(StartStackMode.Background);
    
    this.devPhase = await DevPhase.setup();
    this.api = this.devPhase.api;
    
    this.context.logger.log('Global setup done');
});

after(async function() {
    this.context.logger.log('Global teardown start');
    
    if (this.devPhase) {
        await this.devPhase.cleanup();
    }
    
    if (this.context) {
        await this.context.stopStack();
    }
    
    this.context.logger.log('Global teardown done');
});
