import { accessThroughPath } from '@/utils/accessThroughPath';

export type ReplacePlaceholdersOptions = {
    placeholderRegex? : string | RegExp,
}

export function replacePlaceholders (
    node : any,
    root : any,
    options : ReplacePlaceholdersOptions = {}
)
{
    options = {
        placeholderRegex: /\{\{(.*?)\}\}/g,
        ...options,
    };
    
    for (const [ prop, value ] of Object.entries(node)) {
        if (typeof value === 'string') {
            node[prop] = value.replaceAll(options.placeholderRegex, (match, path) => {
                return accessThroughPath(root, path);
            });
        }
        else if (value instanceof Object) {
            replacePlaceholders(value, root, options);
        }
    }
}
