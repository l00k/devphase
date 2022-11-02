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

- Starting local stack (node + pruntime + pherry)
```shell
yarn devphase stack
```

- Contracts compilation
```shell
yarn devphase compile [contractName] [--watch]
```

- Contracts TS bindings creation (wip)
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
import { ConfigOption } from 'devphase';

const config : ConfigOption = {
    // project directories
    directories: {
        contracts: 'contracts',
        tests: 'tests',
        typings: 'typings'
    },
    /*
     * Stack configuration
     * {
     *     [componentName : string]: {
     *          binary: string, // path to binary; magic phrase "#DEVPHASE#" is replaced with package root dir
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
        node: {
            binary: '#DEVPHASE#/phala-dev-stack/bin/node',
            workingDir: '#DEVPHASE#/phala-dev-stack/.data/node',
            envs: {},
            args: {
                '--dev': true,
                '--rpc-methods': 'Unsafe',
                '--block-millisecs': 6000,
            },
            timeout: 10000,
        },
        pruntime: {
            binary: '#DEVPHASE#/phala-dev-stack/bin/pruntime',
            workingDir: '#DEVPHASE#/phala-dev-stack/.data/pruntime',
            envs: {},
            args: {
                '--allow-cors': true,
                '--cores': 0,
                '--port': 8000,
            },
            timeout: 2000,
        },
        pherry: {
            binary: '#DEVPHASE#/phala-dev-stack/bin/pherry',
            workingDir: '#DEVPHASE#/phala-dev-stack/.data/pherry',
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
    /**
     * Custom mocha configuration
     */
    mocha: {}
};

export default config;
```

### Usage sample
Check [usage sample](https://github.com/l00k/devphase-usage-sample) repo

### Sandbox
Check [sandbox environment](https://github.com/l00k/devphase-sandbox) repo for easy testing with up-to-date code

### TODO
[check here](./TODO.md)
