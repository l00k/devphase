import { Exception } from './Exception';

export function getClassesFromChain(Source : Function): Function[]
{
    if ([ null, undefined ].includes(Source)) {
        return [];
    }
    
    if (!(Source instanceof Function)) {
        throw new Exception(
            'Argument is not a function',
            1657540353008
        );
    }
    
    const collection = [];
    
    let Class = Source;
    do {
        collection.push(Class);
        
        const Prototype = Object.getPrototypeOf(Class.prototype);
        if (!Prototype) {
            break;
        }
        
        Class = Prototype.constructor;
    }
    while (Class !== Object);
    
    return collection;
}
