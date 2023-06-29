# devPHAse
Development tool for Phala Phat contracts.

<!--
![](https://img.shields.io/badge/Coverage-97%25-83A603.svg?prefix=$coverage$)
-->

*Tests for both latest devPHAse and Phala Blockchain release:*  
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/l00k/devphase/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/l00k/devphase/tree/master)


## Requirements

Requirements list for contract (building) commands

- Cargo  
`cargo 1.69.0 (6e9a83356 2023-04-12)` *
- Cargo Contract  
`cargo-contract-contract 3.0.1-unknown-x86_64-unknown-linux-gnu` *
- Target `wasm32-unknown-unknown`
- Component `rust-src`

`*` - previous versions may also work, but it was not tested

## Install

Depending on how you manage your projects you can:
1. You can add devPHAse to your project dependencies (`yarn@^1` / `npm`)  
Sadly `yarn@^3` is not supported (check [#4](https://github.com/l00k/devphase/issues/4))  

```shell
yarn add -D @devphase/cli
yarn add -D typescript ts-node # required peer dependencies

yarn devphase [command]
```
2. Install it globally and use `npx` to call it.  
**Note:** this may be default in Phala's example repos
```shell
npm install -g @devphase/cli
npm install -g typescript ts-node # required peer dependencies

npx @devphase/cli [command]
```

## Sandbox
In directory `workspaces/xsandbox` there is a template of devphase project.  
You can try building and testing contracts.  
More info [here](./workspaces/xsandbox)

## Commands

### Global flags
```shell
--json                      # Prints result of command in json format
-v, --verbose               # Verbose output
-s, --silent                # No output
```

### Commands index
<!-- commands -->
* [`devphase check`](#devphase-check)
* [`devphase init`](#devphase-init)
* [`devphase script [ARGS]`](#devphase-script-args)
* [`devphase account create`](#devphase-account-create)
* [`devphase account list`](#devphase-account-list)
* [`devphase contract create`](#devphase-contract-create)
* [`devphase contract compile`](#devphase-contract-compile)
* [`devphase contract typegen`](#devphase-contract-typegen)
* [`devphase contract validate`](#devphase-contract-validate)
* [`devphase contract test`](#devphase-contract-test)
* [`devphase contract deploy [ARGS]`](#devphase-contract-deploy-args)
* [`devphase contract list`](#devphase-contract-list)
* [`devphase contract call [ARGS]`](#devphase-contract-call-args)
* [`devphase stack run`](#devphase-stack-run)
* [`devphase stack setup`](#devphase-stack-setup)

## `devphase check`

Check project

```
USAGE
  $ devphase check [--json] [-s | -v]

FLAGS
  -s, --silent   No output
  -v, --verbose  Verbose output
  --json         Output in JSON format
```

## `devphase init`

Initiate devPHAse project

```
USAGE
  $ devphase init [--json] [-s | -v]

FLAGS
  -s, --silent   No output
  -v, --verbose  Verbose output
  --json         Output in JSON format
```

## `devphase script [ARGS]`

Run script

```
USAGE
  $ devphase script [ARGS] [-n <value>]

ARGUMENTS
  ARGS  Script(s) to execute

FLAGS
  -n, --network=<value>  [default: local] Network key
```

## `devphase account create`

Creates new managed account

```
USAGE
  $ devphase account create -a <value> [-p <value>] [-n]

FLAGS
  -a, --alias=<value>       (required) Account alias
  -n, --no-passphrase       Force no passphrase (prompted if not specified)
  -p, --passphrase=<value>  Passphrase used to protect keyring
```

## `devphase account list`

Lists managed accounts

```
USAGE
  $ devphase account list [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output csv|json|yaml | 
    | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)
```

## `devphase contract create`

Creates new contract from template

```
USAGE
  $ devphase contract create -n <value> [-t flipper]

FLAGS
  -n, --name=<value>       (required) Contract name
  -t, --template=<option>  [default: flipper] Template name
                           <options: flipper>
```

## `devphase contract compile`

Compile contract

```
USAGE
  $ devphase contract compile [-c <value>] [-w] [-r]

FLAGS
  -c, --contract=<value>  Contract name
  -r, --release           Compile in release mode
  -w, --watch             Watch changes
```

## `devphase contract validate`

Validate contract

```
USAGE
  $ devphase contract validate [-c <value>]

FLAGS
  -c, --contract=<value>  Contract name
```

## `devphase contract typegen`

Generate type bindings for compiled contract

```
USAGE
  $ devphase contract typegen -c <value>

FLAGS
  -c, --contract=<value>  (required) Contract name
```

## `devphase contract test`

Run tests for specified contract(s)

```
USAGE
  $ devphase contract test [-t <value>] [-n <value>] [-e] [-m None|Minimal|WithDrivers|WithLogger|0|1|2|3]

FLAGS
  -e, --externalStack            Don't spawn local stack (use external)
  -m, --stackSetupMode=<option>  [default: 1] Stack setup mode
                                 <options: None|Minimal|WithDrivers|WithLogger|0|1|2|3>
  -n, --network=<value>          [default: local] Network key
  -t, --suite=<value>            Test suite name (directory in tests)
```

## `devphase contract deploy [ARGS]`

Deploy contract

```
USAGE
  $ devphase contract deploy [ARGS] -c <value> -o <value> [-t InkCode|SidevmCode] [-n <value>] [-l <value>] [-a
    <value>]

ARGUMENTS
  ARGS  Constructor arguments

FLAGS
  -a, --account=<value>      [default: alice] Account used to deploy (managed account key)
  -c, --contract=<value>     (required) Contract name
  -l, --cluster=<value>      Target cluster Id
  -n, --network=<value>      [default: local] Target network to deploy (local default)
  -o, --constructor=<value>  (required) Contract constructor to call (name)
  -t, --type=<option>        [default: InkCode]
                             <options: InkCode|SidevmCode>
```

## `devphase contract list`

Lists managed contracts

```
USAGE
  $ devphase contract list [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output csv|json|yaml | 
    | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)
```

## `devphase contract call [ARGS]`

Call contract

```
USAGE
  $ devphase contract call [ARGS] -c <value> -i <value> -m <value> [-t InkCode|SidevmCode] [-a query|tx] [-n
    <value>] [-l <value>] [-a <value>]

ARGUMENTS
  ARGS  Call arguments

FLAGS
  -a, --accessor=<option>  [default: query] Method type: transaction or query
                           <options: query|tx>
  -a, --account=<value>    [default: alice] Account used to call (managed account key)
  -c, --contract=<value>   (required) Contract name
  -i, --id=<value>         (required) Contract ID
  -l, --cluster=<value>    Target cluster Id
  -m, --method=<value>     (required) Contract method to call (name)
  -n, --network=<value>    [default: local] Target network to deploy (local default)
  -t, --type=<option>      [default: InkCode]
                           <options: InkCode|SidevmCode>
```

## `devphase stack run`

Starts local development stack

```
USAGE
  $ devphase stack run [--save-logs] [--timelimit <value>]

FLAGS
  --save-logs          Save logs to file
  --timelimit=<value>  Execution time limit (ms)
```

## `devphase stack setup`

Setup external stack

```
USAGE
  $ devphase stack setup [-n <value>] [-m None|Minimal|WithDrivers|WithLogger|0|1|2|3]

FLAGS
  -m, --setupMode=<option>  [default: 3] Stack setup mode
                            <options: None|Minimal|WithDrivers|WithLogger|0|1|2|3>
  -n, --network=<value>     [default: local] Network key
```
<!-- commandsstop -->

## Configuration
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
        scripts: 'scripts',
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
        version: 'latest', // version which you want to pull from official repository (tag name) or "latest" one
        blockTime: 6000, // default block time for direct stack running (may be overriden in testing mode)
        setupOptions: {
            mode: StackSetupMode.None,
            workerUrl: 'http://localhost:{{stack.pruntime.port}}'
        },
        node: {
            port: 9944, // ws port
            binary: '{{directories.stacks}}/{{stack.version}}/phala-node',
            workingDir: '{{directories.stacks}}/.data/node',
            dataDir: '{{directories.stacks}}/.data/node',
            envs: {},
            args: {
                '--dev': true,
                '--rpc-methods': 'Unsafe',
                '--ws-port': '{{stack.node.port}}',
                '--block-millisecs': '{{stack.blockTime}}', // override at runtime
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
                '--dev-wait-block-ms': '{{stack.blockTime}}', // override at runtime
            },
            timeout: 2000,
        }
    },
    /**
     * Testing configuration
     */
    testing: {
        mocha: {}, // custom mocha configuration
        blockTime: 100, // block time override for spawning local testnet
        stackSetupConfig: { // environment setup
            setup: {
                custom: undefined, // custom setup procedure callback; (devPhase) => Promise<void>
                timeout: 60 * 1000,
            },
            teardown: {
                custom: undefined, // custom teardown procedure callback ; (devPhase) => Promise<void>
                timeout: 10 * 1000,
            }
        },
        stackLogOutput: false, // display stack output in console
    },
    /**
     * Networks configuration
     * Default network is local and it can be changed using CLI argument
     */
    networks: {
        local: {
            nodeUrl: 'ws://localhost:{{stack.node.port}}',
            nodeApiOptions: {},
            workerUrl: 'http://localhost:{{stack.pruntime.port}}',
            defaultClusterId: '0x0000000000000000000000000000000000000000000000000000000000000000', // set default cluster ID for further actions
            blockTime: 6000, // network block time (may be overriden in testing mode)
        },
        poc5: {
            nodeUrl: 'wss://poc5.phala.network/ws',
            workerUrl: 'https://poc5.phala.network/tee-api-1',
            defaultClusterId: '0x0000000000000000000000000000000000000000000000000000000000000001',
        },
        [networkKey]: {
            nodeUrl: 'ws://...',
            workerUrl: 'http://...',
            defaultClusterId: '0x0abc...',
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
