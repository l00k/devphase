import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { DevPhase, Logger, RuntimeContext, RunMode, StackManager } from '@devphase/service';

chai.use(chaiAsPromised);

(<any>global).expect = chai.expect;


const logger = new Logger('Test');

before(async function() {
    this.runtimeContext = await RuntimeContext.getSingleton();
    this.stackManager = new StackManager(this.runtimeContext);
    
    const {
        spawnStack,
        envSetup: { setup }
    } = this.runtimeContext.config.testing;
    
    this.timeout(setup.timeout);
    
    logger.log('Global setup start');
    if (spawnStack) {
        logger.log('Preparing dev stack');
        await this.stackManager.startStack(
            RunMode.Testing,
            { saveLogs: true }
        );
    }
    
    logger.log('Init API');
    this.devPhase = await DevPhase.create(this.runtimeContext, RuntimeContext.NETWORK_LOCAL);
    this.api = this.devPhase.api;
    
    logger.log('Setup environment');
    if (setup.custom) {
        await setup.custom(this.devPhase);
    }
    else {
        // run default
        await this.devPhase.stackSetup();
    }
    
    logger.log('Global setup done');
    logger.log('Starting tests');
});

after(async function() {
    logger.log('Global teardown start');
    
    const {
        spawnStack,
        envSetup: { teardown }
    } = this.runtimeContext.config.testing;
    
    this.timeout(teardown.timeout);
    
    if (teardown.custom) {
        logger.log('Custom tear down');
        await teardown.custom(this.devPhase);
    }
    
    if (this.devPhase) {
        logger.log('Internal clean up');
        await this.devPhase.cleanup();
    }
    
    if (
        spawnStack
        && this.stackManager
    ) {
        logger.log('Stopping stack');
        await this.stackManager.stopStack();
    }
    
    logger.log('Global teardown done');
});
