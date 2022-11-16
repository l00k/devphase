import { ProjectConfig, ProjectConfigOptions } from '@/def';
import { StackBinaryDownloader } from '@/service/project/StackBinaryDownloader';
import { Exception } from '@/utils/Exception';
import { replacePlaceholders } from '@/utils/replacePlaceholders';
import { replaceRecursive } from '@/utils/replaceRecursive';
import findUp from 'find-up';
import path from 'path';


export class RuntimeContext
{
    
    protected static readonly SINGLETON_KEY = 'devphase_Context_VSffVql3bvj9aulZY5DNnRCnrEt1V27a';
    
    protected _stackBinaryDownloader : StackBinaryDownloader;
    
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
    
    public async isInProjectDirectory () : Promise<boolean>
    {
        const configFilePath = await findUp([
            'devphase.config.ts',
            'devphase.config.js',
        ]);
        
        return (configFilePath !== undefined);
    }
    
    public async requestProjectDirectory ()
    {
        const isInProjectDirectory = await this.isInProjectDirectory();
        if (!isInProjectDirectory) {
            throw new Exception(
                'Config file not found',
                1665952724703
            );
        }
    }
    
    
    protected async _init () : Promise<void>
    {
        const configFilePath = await findUp([
            'devphase.config.ts',
            'devphase.config.js',
        ]);
        
        this.libPath = __dirname.endsWith('/cli')
            ? path.join(__dirname, '../../')
            : path.join(__dirname, '../');
        
        if (configFilePath) {
            this.projectDir = path.dirname(configFilePath);
            
            const userConfig = require(configFilePath).default;
            this.config = await this._getFallbackConfig(userConfig);
        }
        
        // download stack
        this._stackBinaryDownloader = new StackBinaryDownloader(this);
        await this._stackBinaryDownloader.download();
    }
    
    
    protected async _getFallbackConfig (options : ProjectConfigOptions) : Promise<ProjectConfig>
    {
        const config : ProjectConfig = <any>replaceRecursive<ProjectConfigOptions>({
            directories: {
                artifacts: 'artifacts',
                contracts: 'contracts',
                logs: 'logs',
                stack: 'stack',
                tests: 'tests',
                typings: 'typings'
            },
            stack: {
                version: 'latest',
                downloadPath: '{{directories.stack}}/{{stack.version}}/',
                node: {
                    port: 9945,
                    binary: '{{directories.stack}}/{{stack.version}}/phala-node',
                    workingDir: '{{directories.stack}}/.data/node',
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
                    binary: '{{directories.stack}}/{{stack.version}}/pruntime',
                    workingDir: '{{directories.stack}}/.data/pruntime',
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
                    binary: '{{directories.stack}}/{{stack.version}}/pherry',
                    workingDir: '{{directories.stack}}/.data/pherry',
                    envs: {},
                    args: {
                        '--no-wait': true,
                        '--mnemonic': '{{stack.pherry.gkMnemonic}}',
                        '--inject-key': '0000000000000000000000000000000000000000000000000000000000000001',
                        '--substrate-ws-endpoint': 'ws://localhost:{{stack.node.port}}',
                        '--pruntime-endpoint': 'http://localhost:{{stack.pruntime.port}}',
                        '--dev-wait-block-ms': 1000,
                    },
                    timeout: 5000,
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
                stackLogOutput: false,
            }
        }, options);
        
        // replace stack version
        config.stack.version = await StackBinaryDownloader.uniformStackVersion(config.stack.version);
        
        // process placeholders
        replacePlaceholders(config, config);
        
        return config;
    }
    
}
