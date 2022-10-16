import { Config } from '@/def';
import { Exception } from '@/utils/Exception';
import { Logger } from '@/utils/Logger';
import findUp from 'find-up';
import path from 'path';


export class Context
{
    
    public logger : Logger = new Logger('devPHAse CLI', true);
    
    public libPath : string;
    public projectDir : string;
    public config : Config;
    
    protected constructor () {}
    
    protected async _init() : Promise<void>
    {
        const configFilePath = await findUp([
            'devphase.config.ts',
            'devphase.config.js',
        ]);
        if (!configFilePath) {
            throw new Exception(
                'Config file not found',
                1665952724703
            );
        }
        
        this.libPath = path.join(__dirname, '../../');
        this.projectDir = path.dirname(configFilePath);
        this.config = require(configFilePath).default;
    }
    
    public static async create() : Promise<Context>
    {
        const instance = new Context();
        
        await instance._init();
        
        return instance;
    }
    
}
