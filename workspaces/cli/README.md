# devPHAse
Development tool for Phala Phat contracts.

<!--
![](https://img.shields.io/badge/Coverage-97%25-83A603.svg?prefix=$coverage$)
-->

## Install

Add to your projects using package manager (`yarn@^1` / `npm`)  
Sadly `yarn@^3` is not supported (check [#4](https://github.com/l00k/devphase/issues/4))  

```shell
yarn add -D @devphase/cli
yarn add -D typescript ts-node # required peer dependencies
```

## Sandbox
In directory `workspaces/xsandbox` there is a template of devphase project.  
You can try building and testing contracts.  
More info [here](./workspaces/xsandbox)

## Commands

### Global flags
```shell
--json                      # Prints result of command in json format
--verbosity=X               # Adjusts verbosity (0 - silent, 1 - default, 2 - verbose)
```

#### Project commands
- Init project (creates required files and directories)
```shell
yarn devphase init
```

- Check project configuration and dependencies
```shell
yarn devphase check
```

#### Stack related commands
- Starting local stack (node + pruntime + pherry)
```shell
yarn devphase stack run [--save-log]
--save-log                  # Saves logs to file
```

- Setup local stack (register gatekeeper, create cluster, deploy system contract etc.)
```shell
yarn devphase stack setup
-m, --setupMode=<option>    # Stack setup mode <options: 0 - Minimal | 1 - WithDrivers | 2 - WithLogger>
-n, --network               # Switch network (local - by default)
```

#### Accounts management
- Prints list of managed accounts (from `./accounts.json`)
```shell
yarn devphase account list [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output csv|json|yaml] [--csv | --no-truncate] [--no-header]
```
- Creates new managed account
```shell
yarn devphase account create -a <value> [-p <value>] [-n]

-a, --alias=<value>         # (required) Account alias
-n, --no-passphrase         # Force no passphrase (prompted if not specified)
-p, --passphrase=<value>    # Passphrase used to protect keyring

```

#### Contracts management
- Prints list of managed contracts (from `./contracts.json`)
```shell
yarn devphase contract list [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output csv|json|yaml] [--csv | --no-truncate] [--no-header]
```
- Creates new contract project from template
```shell
yarn devphase contract create -n <value> [-t flipper]
-n, --name=<value>          # (required) Contract name
-t, --template=<option>     # [default: flipper] Template name <options: flipper>
```
- Compiles contract using system `cargo` binary
```shell
yarn devphase contract compile [-c <value>] [-w] [-r]
-c, --contract=<value>      # Contract name
-r, --release               # Compile in release mode
-w, --watch                 # Watch changes
```
- Deployes contract to network
```shell
yarn devphase contract deploy [ARGS] -c <value> -o <value> [-t InkCode|SidevmCode] [-n <value>] [-l <value>] [-a <value>]
ARGS                        # Constructor arguments
-a, --account=<value>       # [default: alice] Account used to deploy (managed account key)
-c, --contract=<value>      # (required) Contract name
-l, --cluster=<value>       # Target cluster Id
-n, --network=<value>       # [default: local] Target network to deploy (local default)
-o, --constructor=<value>   # (required) Contract constructor to call (name)
-t, --type=<option>         # [default: InkCode] <options: InkCode|SidevmCode>
```
- Executes contract call
```shell
yarn devphase contract call [ARGS] -c <value> -i <value> -m <value> [-t InkCode|SidevmCode] [-a query|tx] [-n <value>] [-l <value>] [-a <value>]
ARGS                        # Call arguments
-a, --accessor=<option>     # [default: query] Method type: transaction or query <options: query|tx>
-a, --account=<value>       # [default: alice] Account used to call (managed account key)
-c, --contract=<value>      # (required) Contract name
-i, --id=<value>            # (required) Contract ID
-l, --cluster=<value>       # Target cluster Id
-m, --method=<value>        # (required) Contract method to call (name)
-n, --network=<value>       # [default: local] Target network to deploy (local default)
-t, --type=<option>         # [default: InkCode] <options: InkCode|SidevmCode>
```
- Contracts TS bindings creation
```shell
yarn devphase contract typegen -c <value>
-c, --contract=<value>      # (required) Contract name
```
- Testing with mocha
```shell
yarn devphase contract test [-s <value>] [-n <value>]
-m, --setupMode=<option>    # Stack setup mode <options: 0 - Minimal | 1 - WithDrivers | 2 - WithLogger>
-n, --network=<value>       # [default: local] Network key
-s, --suite=<value>         # Test suite name (directory)

```

## Configuration
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
            dataDir: '{{directories.stacks}}/.data/node',
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
            dataDir: '{{directories.stacks}}/.data/pruntime',
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
            dataDir: '{{directories.stacks}}/.data/pherry',
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
