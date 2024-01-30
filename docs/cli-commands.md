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
