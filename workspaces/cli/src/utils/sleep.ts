export async function sleep<T> (
    time : number
) : Promise<T>
{
    return new Promise(resolve => setTimeout(resolve, time));
}
