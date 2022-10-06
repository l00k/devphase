import colors from 'colors';

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
        public serviceName : string,
        public showServiceName : boolean
    )
    {}
    
    public log (...args : any[])
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Log) {
            return;
        }
        
        const logArgs = [ ...args ];
        if (this.showServiceName) {
            logArgs.unshift(colors.white(`[${this.serviceName}]`));
        }
        
        console.log(...logArgs);
    }
    
    public dir (object : any, options? : any)
    {
        const serviceName = colors.white(`[${this.serviceName}]`);
        
        if (this.showServiceName) {
            console.log(serviceName);
        }
        console.dir(object, options);
    }
    
    
    public debug (...args : any[])
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Debug) {
            return;
        }
        
        const logArgs = [ ...args ];
        if (this.showServiceName) {
            logArgs.unshift(colors.grey(`[${this.serviceName}]`));
        }
        
        console.debug(...logArgs);
    }
    
    public info (...args : any[])
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Info) {
            return;
        }
        
        const logArgs = [ ...args ];
        if (this.showServiceName) {
            logArgs.unshift(colors.cyan(`[${this.serviceName}]`));
        }
        
        console.info(...logArgs);
    }
    
    public warn (...args : any[])
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Warn) {
            return;
        }
        
        const logArgs = [ ...args ];
        if (this.showServiceName) {
            logArgs.unshift(colors.yellow(`[${this.serviceName}]`));
        }
        
        console.warn(...logArgs);
    }
    
    public error (...args : any[])
    {
        if (Logger.LOGGER_LEVEL > LoggerLevel.Error) {
            return;
        }
        
        const logArgs = [ ...args ];
        if (this.showServiceName) {
            logArgs.unshift(colors.red(`[${this.serviceName}]`));
        }
        
        console.error(...logArgs);
    }
    
}
