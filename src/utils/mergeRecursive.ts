import mergeWith from 'lodash/mergeWith';

export function mergeRecursive<T> (target : Partial<T>, ...source : any[]) : T
{
    return mergeWith(target, ...source, (obj, src) : any => {
        if (src instanceof Array) {
            if (obj instanceof Array) {
                return obj.concat(src);
            }
            else {
                return src;
            }
        }
    });
}
