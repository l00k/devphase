import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { DevPhase, Logger, RuntimeContext, SpawnMode, StackManager } from 'devphase';

chai.use(chaiAsPromised);

(<any>global).expect = chai.expect;


const logger = new Logger('Test / Mocha');

before(async function() {
    this.runtimeContext = await RuntimeContext.getSingleton();
    this.stackManager = new StackManager(this.runtimeContext);
    
    const { envSetup: { setup } } = this.runtimeContext.config.testing;
    
    this.timeout(setup.timeout);
    
    logger.log('Global setup start');
    
    logger.log('Preparing dev stack');
    await this.stackManager.startStack(SpawnMode.Testing);
    
    logger.log('Init API');
    this.devPhase = await DevPhase.setup(
        this.runtimeContext.config.devPhaseOptions,
        this.runtimeContext
    );
    this.api = this.devPhase.api;
    
    logger.log('Setup environment');
    if (setup.custom) {
        await setup.custom(this.devPhase);
    }
    else {
        // run default
        await this.devPhase.defaultEnvSetup();
    }
    
    logger.log('Global setup done');
});

after(async function() {
    logger.log('Global teardown start');
    
    const { envSetup: { teardown } } = this.runtimeContext.config.testing;
    
    this.timeout(teardown.timeout);
    
    if (teardown.custom) {
        logger.log('Custom tear down');
        await teardown.custom(this.devPhase);
    }
    
    if (this.devPhase) {
        logger.log('Internal clean up');
        await this.devPhase.cleanup();
    }
    
    if (this.stackManager) {
        logger.log('Stopping stack');
        await this.stackManager.stopStack();
    }
    
    logger.log('Global teardown done');
});
