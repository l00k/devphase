import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { DevPhase, Logger, RuntimeContext, StackManager, SpawnMode } from 'devphase';

chai.use(chaiAsPromised);

(<any>global).expect = chai.expect;


const logger = new Logger('Test / Mocha');

before(async function() {
    this.timeout(30 * 1000);
    
    this.runtimeContext = await RuntimeContext.getSingleton();
    this.stackManager = new StackManager(this.runtimeContext);
    
    logger.log('Global setup start');
    
    await this.stackManager.startStack(SpawnMode.Background);
    
    this.devPhase = await DevPhase.setup();
    this.api = this.devPhase.api;
    
    logger.log('Global setup done');
});

after(async function() {
    logger.log('Global teardown start');
    
    if (this.devPhase) {
        await this.devPhase.cleanup();
    }
    
    if (this.stackManager) {
        await this.stackManager.stopStack();
    }
    
    logger.log('Global teardown done');
});
