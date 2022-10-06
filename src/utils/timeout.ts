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
        setTimeout(() => reject(new Exception(options.message, 1663946429155)), timeLimit);
        
        try {
            const result = await callback();
            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
}
