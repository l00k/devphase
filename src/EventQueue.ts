import { ApiPromise } from '@polkadot/api';
import { IEvent } from '@polkadot/types/types';
import { IEventRecord } from '@polkadot/types/types/events';


type HandlerCallee = (event : IEvent<any>) => Promise<void>;
export type ArgsFilters = {
    [dataKey : number] : any | any[],
}
type HandlerDescription = {
    callee : HandlerCallee,
    argsFilters : ArgsFilters,
    once : boolean,
    
    drop? : boolean,
}

export class EventQueue
{
    
    protected _api : ApiPromise;
    protected _eventsSubscription : any;
    
    protected _handlers : Record<string, HandlerDescription[]> = {};
    
    public async init (api : ApiPromise)
    {
        this._api = api;
        
        this._eventsSubscription = await this._api.query
            .system.events((events) => this._handleEvents(events));
    }
    
    public async destroy ()
    {
        if (this._eventsSubscription instanceof Function) {
            await this._eventsSubscription();
        }
    }
    
    public registerHandler (
        eventKey : string,
        argsFilters : ArgsFilters = {},
        callee : HandlerCallee,
        once : boolean = true,
    )
    {
        if (!this._handlers[eventKey]) {
            this._handlers[eventKey] = [];
        }
        
        this._handlers[eventKey].push({
            callee,
            argsFilters,
            once,
        });
    }
    
    protected async _handleEvents (events : IEventRecord<any>[])
    {
        for (const { event } of events) {
            const eventKey = event.section + '.' + event.method;
            if (!this._handlers[eventKey]?.length) {
                continue;
            }
            
            const eventData = event.data.toJSON();
            
            for (const handler of this._handlers[eventKey]) {
                const matchArgs = this._checkMatchArgs(
                    handler.argsFilters,
                    eventData
                );
                if (matchArgs) {
                    await handler.callee(event);
    
                    if (handler.once) {
                        handler.drop = true;
                    }
                }
            }
            
            // remove dropped handlers
            this._handlers[eventKey] = this._handlers[eventKey]
                .filter(handler => !handler.drop);
        }
    }
    
    protected _checkMatchArgs(
        argsFilters : ArgsFilters,
        args : any[],
    ) : boolean
    {
        for (const [ argIdx, argFilter ] of Object.entries(argsFilters)) {
            const argValue = args[argIdx];
            if (argFilter instanceof Array) {
                if (!argFilter.includes(argValue)) {
                    return false;
                }
            }
            else if (argFilter != argValue) {
                return false;
            }
        }
        
        return true;
    }
    
}
