import mergeWith from 'lodash/mergeWith';

export function replaceRecursive<T> (target : Partial<T>, ...source : any[]) : T
{
    return mergeWith(target, ...source, (obj, src) : any => {
        if (src instanceof Array) {
            return src;
        }
    });
}
