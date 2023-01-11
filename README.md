# devPHAse
Development tool for Phala Phat contracts.

<!--
![](https://img.shields.io/badge/Coverage-97%25-83A603.svg?prefix=$coverage$)
-->

## Install

Add to your projects using package manager (`yarn@^1` / `npm`)

```shell
yarn add -D devphase
yarn add -D typescript ts-node # required peer dependencies
```

## Features

- Init project (creates required files and directories)
```shell
yarn devphase init
```

- Starting local stack (node + pruntime + pherry)
```shell
yarn devphase stack
```

- Setup local stack (register gatekeeper, create cluster, deploy system contract etc.)
```shell
yarn devphase stack:setup
```

- Contracts compilation
```shell
yarn devphase compile [contractName] [--watch]
```

- Contracts TS bindings creation
```shell
yarn devphase typings [contractName]
```

- Testing with mocha
```shell
yarn devphase test
```

### Configuration
Create `devphase.config.ts` in root directory (`init` command in TODO)

Here is default configuration. All values are optional (merged recuresivly)
```ts
import { ProjectConfigOptions } from 'devphase';

const config : ProjectConfigOptions = {
    /*
     * Project directories
     */
    directories: {
        artifacts: 'artifacts',
        contracts: 'contracts',
        logs: 'logs',
        stacks: 'stacks',
        tests: 'tests',
        typings: 'typings'
    },
    /*
     * Stack configuration
     * {
     *     [componentName : string]: {
     *          binary: string, // path to binary
     *          workingDir: string, // working directory as above
     *          evns: {
     *              [name: string]: string,
     *          },
     *          args: {
     *              [name: string]: string,
     *          },
     *          timeout: number // start up timeout
     *     }
     * }
     */
    stack: {
        blockTime: 6000, // default block time for direct stack running (may be overriden in testing mode)
        version: 'latest', // version which you want to pull from official repository (tag name) or "latest" one
        node: {
            port: 9944, // ws port
            binary: '{{directories.stacks}}/{{stack.version}}/phala-node',
            workingDir: '{{directories.stacks}}/.data/node',
            envs: {},
            args: {
                '--dev': true,
                '--rpc-methods': 'Unsafe',
                '--block-millisecs': '{{stack.blockTime}}',
                '--ws-port': '{{stack.node.port}}'
            },
            timeout: 10000,
        },
        pruntime: {
            port: 8000, // server port
            binary: '{{directories.stacks}}/{{stack.version}}/pruntime',
            workingDir: '{{directories.stacks}}/.data/pruntime',
            envs: {},
            args: {
                '--allow-cors': true,
                '--cores': 0,
                '--port': '{{stack.pruntime.port}}'
            },
            timeout: 2000,
        },
        pherry: {
            gkMnemonic: '//Alice', // gate keeper mnemonic
            binary: '{{directories.stacks}}/{{stack.version}}/pherry',
            workingDir: '{{directories.stacks}}/.data/pherry',
            envs: {},
            args: {
                '--no-wait': true,
                '--mnemonic': '{{stack.pherry.gkMnemonic}}',
                '--inject-key': '0000000000000000000000000000000000000000000000000000000000000001',
                '--substrate-ws-endpoint': 'ws://localhost:{{stack.node.port}}',
                '--pruntime-endpoint': 'http://localhost:{{stack.pruntime.port}}',
                '--dev-wait-block-ms': '{{stack.blockTime}}',
            },
            timeout: 2000,
        }
    },
    /**
     * Testing configuration
     */
    testing: {
        mocha: {}, // custom mocha configuration
        spawnStack: true, // spawn runtime stack? or assume there is running one
        stackLogOutput: false, // if specifed pipes output of all stack component to file (by default it is ignored)
        blockTime: 100, // overrides block time specified in node (and pherry) component
        envSetup: { // environment setup
            setup: {
                custom: undefined, // custom setup procedure callback; (devPhase) => Promise<void>
                timeout: 60 * 1000,
            },
            teardown: {
                custom: undefined, // custom teardown procedure callback ; (devPhase) => Promise<void>
                timeout: 10 * 1000,
            }
        },
    },
    /**
     * Networks configuration
     * Default network is local and it can be changed using CLI argument
     */
    networks: {
        local: {
            nodeUrl: 'ws://localhost:{{stack.node.port}}',
            nodeApiOptions: {
                types: {
                    ...KhalaTypes,
                    ...PhalaSDKTypes,
                }
            },
            workerUrl: 'http://localhost:{{stack.pruntime.port}}',
            blockTime: 6000, // network block time (may be overriden in testing mode)
        }
    },
    /**
     * Accounts fallback configuration
     * It is overriden by values saved in ./accounts.json
     */
    accountsConfig: {
        keyrings: {
            alice: '//Alice', // string (in case of mnemonic) or account keyring JSON
            bob: '//Bob',
            charlie: '//Charlie',
            dave: '//Dave',
            eve: '//Eve',
            ferdie: '//Ferdie'
        },
        suAccount: 'alice'
    }
};

export default config;
```

### Usage sample
Check [usage sample](https://github.com/l00k/devphase-usage-sample) repo

### Sandbox
Check [sandbox environment](https://github.com/l00k/devphase-sandbox) repo for easy testing with up-to-date code

### TODO
[check here](./TODO.md)
