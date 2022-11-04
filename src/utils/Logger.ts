import chalk from 'chalk';

export enum LoggerLevel
{
    Debug = 0,
    Log = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    NoLogging = 5,
}


/* istanbul ignore next */
export class Logger
{
    
    public static LOGGER_LEVEL : LoggerLevel = LoggerLevel.Log;
    
    
    public constructor (
        public serviceName : string
    )
    {}
    
    public log (...args : any[])
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Log) {
            return;
        }
        
        const logArgs = [ ...args ];
        logArgs.unshift(chalk.white(`[${this.serviceName}]`));
        
        console.log(...logArgs);
    }
    
    public time (label : string)
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Log) {
            return;
        }
        
        const text = chalk.white(`[${this.serviceName}]`) + ' ' + label;
        console.time(text);
    }
    
    public timeEnd (label : string)
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Log) {
            return;
        }
        
        const text = chalk.white(`[${this.serviceName}]`) + ' ' + label;
        console.timeEnd(text);
    }
    
    public timeLog (label : string)
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Log) {
            return;
        }
        
        const text = chalk.white(`[${this.serviceName}]`) + ' ' + label;
        console.timeLog(text);
    }
    
    public timeStamp (label : string)
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Log) {
            return;
        }
        
        const text = chalk.white(`[${this.serviceName}]`) + ' ' + label;
        console.timeStamp(text);
    }
    
    
    public dir (object : any, options? : any)
    {
        const serviceName = chalk.white(`[${this.serviceName}]`);
        
        console.log(serviceName);
        console.dir(object, options);
    }
    
    
    public debug (...args : any[])
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Debug) {
            return;
        }
        
        const logArgs = [ ...args ];
        logArgs.unshift(chalk.grey(`[${this.serviceName}]`));
        
        console.debug(...logArgs);
    }
    
    public info (...args : any[])
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Info) {
            return;
        }
        
        const logArgs = [ ...args ];
        logArgs.unshift(chalk.cyan(`[${this.serviceName}]`));
        
        console.info(...logArgs);
    }
    
    public warn (...args : any[])
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Warn) {
            return;
        }
        
        const logArgs = [ ...args ];
        logArgs.unshift(chalk.yellow(`[${this.serviceName}]`));
        
        console.warn(...logArgs);
    }
    
    public error (...args : any[])
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Error) {
            return;
        }
        
        const logArgs = [ ...args ];
        logArgs.unshift(chalk.red(`[${this.serviceName}]`));
        
        console.error(...logArgs);
    }
    
}
