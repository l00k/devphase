import { Exception } from '@/utils/Exception';

export type WaitForOptions = {
    checkInterval? : number,
    message? : string,
}

export async function waitFor<T> (
    callback : () => Promise<T>,
    timeLimit : number,
    options : WaitForOptions = {}
) : Promise<T>
{
    options = {
        checkInterval: 500,
        message: 'Timeout',
        ...options,
    };
    
    let _intervalHandle = null;
    let _timeoutHandle = null;
    
    return new Promise((resolve, reject) => {
        _intervalHandle = setInterval(async() => {
            try {
                const result = await callback();
                if (result) {
                    clearTimeout(_timeoutHandle);
                    clearInterval(_intervalHandle);
                    
                    resolve(result);
                }
            }
            catch (e) {
                clearTimeout(_timeoutHandle);
                
                reject(e);
            }
        }, options.checkInterval);
        
        _timeoutHandle = setTimeout(() => {
            clearInterval(_intervalHandle);
            reject(new Exception(options.message, 1663946414394));
        }, timeLimit);
    });
}
