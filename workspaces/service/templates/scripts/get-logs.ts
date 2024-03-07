import { DevPhase, RuntimeContext } from '@devphase/service';

export default async function(
    runtimeContext : RuntimeContext,
    devPhase : DevPhase
) {
    const pinkLogger = await devPhase.getPinkLogger();
    
    const contractIds = [
        '0x0be1422cabcab1e36c7b9be02bf7ebea8dc43bb8c6905b86c9e3977b50f02c78',
    ];
    
    for (const contractId of contractIds) {
        const logs = await pinkLogger.getNewLogs(contractId, 0);
        console.dir(logs, { depth: 10 });
    }
}
