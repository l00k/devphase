export function serializeProcessArgs (args : Record<string, any>) : string[]
{
    const serialized : string[] = [];
    
    for (const [ name, value ] of Object.entries(args)) {
        if ([ undefined, null, false ].includes(value)) {
            continue;
        }
        else if (value === true) {
            serialized.push(name);
        }
        else {
            serialized.push(name + '=' + value);
        }
    }
    
    return serialized;
}
