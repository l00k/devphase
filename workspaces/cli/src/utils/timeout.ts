import { Exception } from '@/utils/Exception';


export type TimeoutOptions = {
    message? : string,
};

export function timeout (
    callback : () => Promise<any>,
    timeLimit : number,
    options : TimeoutOptions = {}
)
{
    options = {
        message: 'Timeout',
        ...options,
    };
    
    return new Promise(async(resolve, reject) => {
        const _timeout = setTimeout(
            () => reject(new Exception(options.message, 1663946429155)),
            timeLimit
        );
        
        try {
            const result = await callback();
            
            clearTimeout(_timeout);
            resolve(result);
        }
        catch (e) {
            clearTimeout(_timeout);
            reject(e);
        }
    });
}
