import { ComponentName, Config, ConfigOption } from '@/def';
import { Exception } from '@/utils/Exception';
import { replaceRecursive } from '@/utils/replaceRecursive';
import { ChildProcess } from 'child_process';
import findUp from 'find-up';
import path from 'path';


export class RuntimeContext
{
    
    protected static readonly SINGLETON_KEY = 'devphase_Context_VSffVql3bvj9aulZY5DNnRCnrEt1V27a';
    
    public libPath : string;
    public projectDir : string;
    public config : Config;
    
    public processes : Record<ComponentName, ChildProcess>;
    
    
    protected constructor () {}
    
    public static async getSingleton () : Promise<RuntimeContext>
    {
        const globalAny = global as any;
        
        if (!globalAny[RuntimeContext.SINGLETON_KEY]) {
            const instance = new RuntimeContext();
            await instance._init();
            
            globalAny[RuntimeContext.SINGLETON_KEY] = instance;
        }
        
        return globalAny[RuntimeContext.SINGLETON_KEY];
    }
    
    protected async _init () : Promise<void>
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
        
        this.libPath = __dirname.endsWith('/cli')
            ? path.join(__dirname, '../../')
            : path.join(__dirname, '../');
        
        this.projectDir = path.dirname(configFilePath);
        
        const userConfig = require(configFilePath).default;
        this.config = this._getFallbackConfig(userConfig);
    }
    
    
    protected _getFallbackConfig (options : ConfigOption) : Config
    {
        return replaceRecursive({
            directories: {
                contracts: 'contracts',
                tests: 'tests',
                typings: 'typings'
            },
            stack: {
                node: {
                    envs: {},
                    args: {
                        '--dev': true,
                        '--rpc-methods': 'Unsafe',
                        '--block-millisecs': 6000,
                    },
                    timeout: 10000,
                },
                pruntime: {
                    envs: {},
                    args: {
                        '--allow-cors': true,
                        '--cores': 0,
                        '--port': 8000,
                    },
                    timeout: 2000,
                },
                pherry: {
                    envs: {},
                    args: {
                        '--no-wait': true,
                        '--mnemonic': '//Alice',
                        '--inject-key': '0000000000000000000000000000000000000000000000000000000000000001',
                        '--substrate-ws-endpoint': 'ws://localhost:9944',
                        '--pruntime-endpoint': 'http://localhost:8000',
                        '--dev-wait-block-ms': 1000,
                    },
                    timeout: 2000,
                }
            },
            mocha: {}
        }, options);
    }
    
}
