import { VerbosityLevel } from '@devphase/service';
import chalk from 'chalk';


/* istanbul ignore next */
export class Logger
{
    
    public static LOGGER_LEVEL : VerbosityLevel = VerbosityLevel.Default;
    
    
    public constructor (
        public serviceName : string
    )
    {}
    
    
    protected _log (
        verbosity : VerbosityLevel,
        color : typeof chalk.Color,
        ...args : any[]
    )
    {
        if (Logger.LOGGER_LEVEL < verbosity) {
            return;
        }
        
        const logArgs = [ ...args ];
        if (this.serviceName) {
            logArgs.unshift(chalk[color](`[${this.serviceName}]`));
        }
        
        console.log(...logArgs);
    }
    
    protected _dir (
        verbosity : VerbosityLevel,
        color : typeof chalk.Color,
        object : any,
        options? : any
    )
    {
        if (Logger.LOGGER_LEVEL < verbosity) {
            return;
        }
        
        if (this.serviceName) {
            console.log(chalk[color](`[${this.serviceName}]`));
        }
        
        console.dir(object, options);
    }
    
    
    public log (...args : any[])
    {
        return this._log(
            VerbosityLevel.Default,
            'white',
            ...args
        );
    }
    
    public logDir (object : any, options? : any)
    {
        return this._log(
            VerbosityLevel.Default,
            'white',
            object,
            options
        );
    }
    
    public debug (...args : any[])
    {
        return this._log(
            VerbosityLevel.Default,
            'gray',
            ...args
        );
    }
    
    public debugDir (object : any, options? : any)
    {
        return this._log(
            VerbosityLevel.Default,
            'gray',
            object,
            options
        );
    }
    
    public info (...args : any[])
    {
        return this._log(
            VerbosityLevel.Default,
            'cyan',
            ...args
        );
    }
    
    public infoDir (object : any, options? : any)
    {
        return this._log(
            VerbosityLevel.Default,
            'cyan',
            object,
            options
        );
    }
    
    public warn (...args : any[])
    {
        return this._log(
            VerbosityLevel.Default,
            'yellow',
            ...args
        );
    }
    
    public warnDir (object : any, options? : any)
    {
        return this._log(
            VerbosityLevel.Default,
            'yellow',
            object,
            options
        );
    }
    
    public error (...args : any[])
    {
        return this._log(
            VerbosityLevel.Default,
            'red',
            ...args
        );
    }
    
    public errorDir (object : any, options? : any)
    {
        return this._log(
            VerbosityLevel.Default,
            'red',
            object,
            options
        );
    }
    
}
