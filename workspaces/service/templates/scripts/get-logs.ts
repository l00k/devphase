import { DevPhase, RuntimeContext } from '@devphase/service';

export default async function(
    runtimeContext : RuntimeContext,
    devPhase : DevPhase
) {
    const pinkLogger = await devPhase.getPinkLogger();
    
    const contractIds = [
        '0x4de5d5ea9bf4d0a432bab890e0b401ea789abaeb4870edafd2f08e026acb4bf9',
    ];
    
    for (const contractId of contractIds) {
        const logs = await pinkLogger.getNewLogs(contractId, 0);
        console.log(contractId);
        console.dir(logs, { depth: 10 });
    }
}
