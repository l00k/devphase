export class Exception
    extends Error
{
    
    public name : string = 'Throwable';
    public code : number;
    
    public constructor (
        message : string,
        code : number = -1,
        error ? : any
    )
    {
        super(message);
        this.code = code;
        
        if (error) {
            this._initErrorMessage(this.message, error);
        }
    }
    
    public toString ()
    {
        return this.name + ': ' + this.message;
    }
    
    protected _initErrorMessage (message, error)
    {
        if (typeof (<any>Error).captureStackTrace === 'function') {
            (<any>Error).captureStackTrace(this, this.constructor);
        }
        else {
            this.stack = (new Error(message)).stack;
        }
        
        const messageLines = (this.message.match(/\n/g) || []).length + 1;
        this.stack = this.constructor.name + ': [' + this.code + '] ' + message + '\n' +
            this.stack.split('\n')
                .slice(1, messageLines + 1)
                .join('\n')
            + '\n'
            + error.stack;
    }
    
}
