import { SystemContract } from '@/def';
import { DevPhase } from '@/service/api/DevPhase';
import { RuntimeContext } from '@/service/project/RuntimeContext';
import { Exception } from '@/utils/Exception';
import * as PhalaSdk from '@phala/sdk';
import { PinkLoggerContractPromise } from '@phala/sdk';
import { ApiPromise } from '@polkadot/api';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


export class PinkLogger
{
    
    protected static readonly EXEC_MODE_MAP = {
        transaction: chalk.green('TX'),
        estimating: chalk.yellow('EST'),
        query: chalk.cyan('QUERY'),
    };
    
    protected static readonly LOG_LEVEL = {
        1: chalk.red('error'),
        2: chalk.yellow('warn'),
        3: chalk.cyan('info'),
        4: chalk.magenta('debug'),
        5: chalk.gray('trace'),
    };
    
    protected _devPhase : DevPhase;
    protected _context : RuntimeContext;
    
    protected _api : ApiPromise;
    protected _phatRegistry : PhalaSdk.OnChainRegistry;
    
    protected _contract : PinkLoggerContractPromise;
    
    protected _logsPath : string;
    
    protected _initialPointer : number;
    protected _pointers : Record<string, number> = {};
    
    
    public constructor (
        devPhase : DevPhase
    )
    {
        this._devPhase = devPhase;
        this._context = devPhase.runtimeContext;
        
        this._logsPath = this._context.paths.currentLog;
    }
    
    public static async create (
        devPhase : DevPhase,
        clusterId? : string
    ) : Promise<PinkLogger>
    {
        const instance = new PinkLogger(devPhase);
        
        instance._api = await devPhase.api;
        instance._phatRegistry = await devPhase.getPhatRegistry({ clusterId });
        
        const systemContract = await devPhase.getSystemContract(clusterId);
        const account = devPhase.suAccount;
        const cert = devPhase.suAccountCert;
        
        const result = await systemContract.query['system::getDriver'](
            account.address,
            { cert },
            SystemContract.PinkLogger
        );
        const output = result.output.toJSON();
        
        if (!output.ok) {
            throw new Exception(
                'Logger not available',
                1698446165946
            );
        }
        
        instance._contract = instance._phatRegistry.loggerContract;
        
        const { currentNumberOfRecords } = await instance._contract.getInfo();
        instance._initialPointer = currentNumberOfRecords;
        
        return instance;
    }
    
    
    public async saveLogs () : Promise<void>
    {
        const { records } = await this._contract.getLog(undefined, this._initialPointer);
        const mappedRecords = this._mapRecords(records);
        
        const logFilePath = path.join(
            this._logsPath,
            'pink_logger.log'
        );
        
        const raw = JSON.stringify(mappedRecords, undefined, 4);
        
        if (!fs.existsSync(this._logsPath)) {
            fs.mkdirSync(this._logsPath, { recursive: true });
        }
        
        fs.writeFileSync(
            logFilePath,
            raw,
            { encoding: 'utf-8' }
        );
    }
    
    
    public async getNewLogs (
        contract? : string
    ) : Promise<PinkLogger.LogRecord[]>
    {
        const pointerKey = contract ?? '$';
        const pointer = this._pointers[pointerKey] ?? this._initialPointer;
        
        const { records, next } = await this._contract.getLog(
            contract,
            pointer
        );
        
        this._pointers[pointerKey] = next;
        
        return this._mapRecords(records);
    }
    
    protected _mapRecords (records : PhalaSdk.SerMessage[]) : PinkLogger.LogRecord[]
    {
        return records.map((raw : any) => {
            const record : PinkLogger.LogRecord = <any>raw;
            
            if (record.timestamp) {
                record.timestamp = new Date(raw.timestamp);
            }
            
            return record;
        });
    }
    
    public prettyPrint (log : PinkLogger.LogRecord)
    {
        process.stdout.write(
            chalk.gray('#' + log.blockNumber) + '\t'
        );
        
        const execMode = PinkLogger.EXEC_MODE_MAP[log.execMode];
        process.stdout.write(execMode);
        
        const logLevel = PinkLogger.LOG_LEVEL[log.level];
        process.stdout.write(`\t${logLevel}\t`);
        
        process.stdout.write(
            '\t' + log.message
        );
        process.stdout.write('\n');
    }
    
}


export namespace PinkLogger
{
    export enum Action
    {
        GetLog = 'GetLog',
    }
    
    export type Filters = {
        contract? : string,
        from? : number,
        count? : number,
    };
    
    export enum LogType
    {
        Log = 'Log',
        Event = 'Event',
        QueryIn = 'QueryIn',
        MessageOutput = 'MessageOutput',
    }
    
    export enum ExecMode
    {
        Transaction = 'transaction',
        Estimating = 'estimating',
        Query = 'query',
    }
    
    export type LogRecord = {
        blockNumber : number,
        contract : string,
        execMode : ExecMode,
        level : number,
        message : string,
        sequence : number,
        timestamp : Date,
        type : LogType
    };
    
    export type GetLogResponse = {
        records : LogRecord[],
        next : number,
    }
}
