import { ComponentName, ProjectConfig, ProjectConfigOptions } from '@/def';
import { Exception } from '@/utils/Exception';
import { replacePlaceholders } from '@/utils/replacePlaceholders';
import { replaceRecursive } from '@/utils/replaceRecursive';
import { ChildProcess } from 'child_process';
import findUp from 'find-up';
import path from 'path';


export class RuntimeContext
{
    
    protected static readonly SINGLETON_KEY = 'devphase_Context_VSffVql3bvj9aulZY5DNnRCnrEt1V27a';
    
    public libPath : string;
    public projectDir : string;
    public config : ProjectConfig;
    
    
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
    
    
    protected _getFallbackConfig (options : ProjectConfigOptions) : ProjectConfig
    {
        const config : ProjectConfig = <any>replaceRecursive<ProjectConfigOptions>({
            directories: {
                artifacts: 'artifacts',
                contracts: 'contracts',
                logs: 'logs',
                tests: 'tests',
                typings: 'typings'
            },
            stack: {
                node: {
                    port: 9945,
                    binary: '#DEVPHASE#/phala-dev-stack/bin/node',
                    workingDir: '#DEVPHASE#/phala-dev-stack/.data/node',
                    envs: {},
                    args: {
                        '--dev': true,
                        '--rpc-methods': 'Unsafe',
                        '--block-millisecs': 6000,
                        '--ws-port': '{{stack.node.port}}'
                    },
                    timeout: 10000,
                },
                pruntime: {
                    port: 8001,
                    binary: '#DEVPHASE#/phala-dev-stack/bin/pruntime',
                    workingDir: '#DEVPHASE#/phala-dev-stack/.data/pruntime',
                    envs: {},
                    args: {
                        '--allow-cors': true,
                        '--cores': 0,
                        '--port': '{{stack.pruntime.port}}'
                    },
                    timeout: 2000,
                },
                pherry: {
                    gkMnemonic: '//Alice',
                    binary: '#DEVPHASE#/phala-dev-stack/bin/pherry',
                    workingDir: '#DEVPHASE#/phala-dev-stack/.data/pherry',
                    envs: {},
                    args: {
                        '--no-wait': true,
                        '--mnemonic': '{{stack.pherry.gkMnemonic}}',
                        '--inject-key': '0000000000000000000000000000000000000000000000000000000000000001',
                        '--substrate-ws-endpoint': 'ws://localhost:{{stack.node.port}}',
                        '--pruntime-endpoint': 'http://localhost:{{stack.pruntime.port}}',
                        '--dev-wait-block-ms': 1000,
                    },
                    timeout: 2000,
                }
            },
            devPhaseOptions: {
                nodeUrl: 'ws://localhost:{{stack.node.port}}',
                workerUrl: 'http://localhost:{{stack.pruntime.port}}',
            },
            testing: {
                mocha: {}, // custom mocha configuration
                blockTime: 100, // overrides block time specified in node (and pherry) component
                envSetup: {
                    setup: {
                        custom: undefined,
                        timeout: 60 * 1000,
                    },
                    teardown: {
                        custom: undefined,
                        timeout: 10 * 1000,
                    }
                },
                stackLogOutput : false,
            }
        }, options);
        
        // process placeholders
        replacePlaceholders(config, config);
        
        return config;
    }
    
}
