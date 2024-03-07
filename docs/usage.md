# Usage

<!-- toc -->

- [1. Install devPHAse and requried libs](#1-install-devphase-and-requried-libs)
- [2. Init project](#2-init-project)
- [3. Prepare environment](#3-prepare-environment)
- [4. Compile contract](#4-compile-contract)
- [5. Run tests](#5-run-tests)
- [6. Long-running local environment](#6-long-running-local-environment)
- [7. Configure network](#7-configure-network)
- [8. Run tests using long-running stack](#8-run-tests-using-long-running-stack)
- [9. Running scripts](#9-running-scripts)
  * [9.1. Deploy contract](#91-deploy-contract)
  * [9.2. Get logs](#92-get-logs)
- [10. Run devPHAse on testnet / mainnet](#10-run-devphase-on-testnet--mainnet)

<!-- tocstop -->

### 1. Install devPHAse and requried libs

```bash
yarn init
yarn add -D typescript ts-node
yarn add -D @devphase/cli
```

### 2. Init project
```bash
yarn devphase init
```
Directory will be initiated with all required files and template Flipper contract.
```bash
- .devphase/        # devPHAse cache directory
- contracts/        # here you store your contracts
    - flipper/          # template Flipper contract
        - Cargo.toml        # rust project file
        - lib.rs            # contract source
- scripts/          # scripts which you can all with devPHAse environment
    - deploy.ts         # sample deployment script
    - get-logs.ts       # sample demonstrating how to get contract logs
- tests/            # here you store e2e tests for contracts
    - flipper/          # flipper related test suite
        - flipper.test.ts   # flipper tests example
```

### 3. Prepare environment
```bash
yarn devphase check
```
This command will ensure the proper stack (node, pruntime, pherry) is ready to run.  
Download stack from offical repository.  
Verify dependencies.

Sample output:
```
yarn devphase check
yarn run v1.22.19
$ (...)/node_modules/.bin/devphase check
[StackBinaryDownloader] Creating stack directory
  ✔ Checking configuration file
  ✔ Check dependencies
  ✔ Checking Phala stack binaries
Done in 42.07s.
```

You will see a new directory has been created
```bash
- stacks/               # here all prepared stacks will be stored
    - nightly-2024-03-07/   # bases on your configuration it will latest available stack or any specific you choose
        - phala-node            # node binary
        - pherry                # pherry binary
        - pruntime              # pruntime binary
        - *.so.*                # multiple requried libs
        - *.contract            # system contracts
```

Now you are ready to go.  

### 4. Compile contract
```bash
yarn devphase contract compile -c flipper
```

It will:
- install contract dependencies
- compile contract (only flipper in this case) and save output to `./contracts/flipper/target`
- copy contract artificats
- generate typescript bindings which you can use in scripts and tests

New files:
```bash
- artifacts/            # here devPHAse will store compiled contract artifacts
    - flipper/              # specific contract
        - flipper.contract      
        - flipper.json
        - flipper.wasm
- typings/              # here devPHAse will store ts bindings
    - Flipper.ts
```

### 5. Run tests
```bash
yarn devphase contract test -t flipper [-m 3]
```

devPHAse in default config will:
- check stack dependencies
- start local stack
- configure local enironment (with minimal required deps)
- execute tests
- save logs into files

Output:
```
yarn devphase contract test -t flipper
yarn run v1.22.19
$ (...)/node_modules/.bin/devphase contract test -t flipper
[StackBinaryDownloader] Preparing Phala stack release nightly-2024-03-07
  ✔ Checking releases directory
  ✔ Checking target release binaries


[Test] Global setup start
[Test] Preparing dev stack
[StackManager] Starting stack nightly-2024-03-07
  ✔ Start node component
  ✔ Start pRuntime component
  ✔ Start pherry component
[Test] Init API
[Test] Setup environment
[StackSetupService] Starting stack setup with default version
  ✔ Fetch worker info
  ✔ Load system contracts
  ↓ Register worker [skipped]
  ✔ Register gatekeeper
  ✔ Upload Pink system code
  ✔ Verify cluster
  ✔ Create cluster
  ✔ Wait for cluster to be ready
  ✔ Add worker endpoint
  ✔ Create system contract API
[Test] Global setup done
[Test] Starting tests
  Flipper
    default constructor
      ✔ Should be created with proper intial value
      ✔ Should be able to flip value (2037ms)
    new constructor
      ✔ Should be created with proper intial value

[Test] Global teardown start
[Test] Internal clean up
[Test] Stopping stack
[Test] Global teardown done
```

Output when runned with -m3 flag (with logger):
```
yarn devphase contract test -t flipper -m 3
yarn run v1.22.19
$ (...)/node_modules/.bin/devphase contract test -t flipper
[StackBinaryDownloader] Preparing Phala stack release nightly-2024-03-07
  ✔ Checking releases directory
  ✔ Checking target release binaries


[Test] Global setup start
[Test] Preparing dev stack
[StackManager] Starting stack nightly-2024-03-07
  ✔ Start node component
  ✔ Start pRuntime component
  ✔ Start pherry component
[Test] Init API
[Test] Setup environment
[StackSetupService] Starting stack setup with default version
  ✔ Fetch worker info
  ✔ Load system contracts
  ✔ Fetch worker info
  ✔ Load system contracts
  ↓ Register worker [skipped]
  ✔ Register gatekeeper
  ✔ Upload Pink system code
  ✔ Verify cluster
  ✔ Create cluster
  ✔ Wait for cluster to be ready
  ✔ Add worker endpoint
  ✔ Create system contract API
  ✔ Deploy tokenomic driver
  ✔ Deploy SideVM driver
  ✔ Calculate logger server contract ID
  ✔ Prepare chain for logger server
  ✔ Deploy logger server
[Test] Global setup done
[Test] Starting tests
  Flipper
    default constructor
      ✔ Should be created with proper intial value
Logs from pink server:
#362    TX      info            Resource uploaded to cluster, by 8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48 (5FHneW46...), type=InkCode, hash=0xc061ad27405e5723dadab3e003583c015bc407a9c3c1b1e5d746d1ff1f4fbae3
#363    EST     info            instantiated
#378    TX      info            instantiated
      ✔ Should be able to flip value (2184ms)
Logs from pink server:
#390    EST     info            instantiated
#414    TX      info            instantiated
    new constructor
      ✔ Should be created with proper intial value
Logs from pink server:
#443    EST     info            instantiated
#461    TX      info            instantiated

[Test] Global teardown start
[Test] Internal clean up
[Test] Stopping stack
[Test] Global teardown done

  3 passing (56s)

Done in 61.94s.
```

New directories:
```bash
- logs/             # here devPHAse will store execution logs
    - 2024-03-07T16:09:43.421Z/     # single execution
        - node.log
        - pherry.log
        - pruntime.log
        - pink_logger.log               # if stack setup with logger here all logs will be stored
```

Running tests this way is nice but only if it is single execution.  
If you are developing new feature it may be required to continuesly test it.  
In this case default procedure is time consuming, because setting up stack takes ~40s.  

Nothing blocks you from using the same running node for multiple tests.  

### 6. Long-running local environment
```bash
yarn devphase stack run --save-logs
```

This command will start and keep running all stack components.  
However, network is not configured yet to accept contracts.  

### 7. Configure network
```bash
yarn devphase stack setup -m 3
```

Sample output:
```bash
yarn devphase stack setup -m 3
yarn run v1.22.19
$ (...)/node_modules/.bin/devphase stack setup -m 3
[StackSetupService] Starting stack setup with default version
  ✔ Fetch worker info
  ✔ Load system contracts
  ✔ Fetch worker info
  ✔ Load system contracts
  ↓ Register worker [skipped]
  ✔ Register gatekeeper
  ✔ Upload Pink system code
  ✔ Verify cluster
  ✔ Create cluster
  ✔ Wait for cluster to be ready
  ✔ Add worker endpoint
  ✔ Create system contract API
  ✔ Deploy tokenomic driver
  ✔ Deploy SideVM driver
  ✔ Calculate logger server contract ID
  ✔ Prepare chain for logger server
  ✔ Deploy logger server
[StackSetup] Stack is ready
[StackSetup] Cluster Id
[StackSetup] 0x0000000000000000000000000000000000000000000000000000000000000001
Done in 42.78s.
```

Now all requried network components should be ready.

### 8. Run tests using long-running stack
```bash
yarn devphase contract test -t flipper -e
```
`-e` flag will make devPHAse to execute test without setting up temporary stack but using existing one

Sample output:
```
yarn devphase contract test -t flipper -e
yarn run v1.22.19
$ (...)/node_modules/.bin/devphase contract test -t flipper -e
[Test] Global setup start
[Test] Init API
[Test] Setup environment
[StackSetupService] Starting stack setup with default version
  ✔ Fetch worker info
  ✔ Load system contracts
  ↓ Register worker [skipped]
  ↓ Register gatekeeper [skipped]
  ↓ Upload Pink system code [skipped]
  ✔ Verify cluster
  ↓ Create cluster [skipped]
  ✔ Wait for cluster to be ready
  ↓ Add worker endpoint [skipped]
  ✔ Create system contract API
[Test] Global setup done
[Test] Starting tests
  Flipper
    default constructor
      ✔ Should be created with proper intial value
Logs from pink server:
#761    TX      info            Resource uploaded to cluster, by 8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48 (5FHneW46...), type=InkCode, hash=0xc061ad27405e5723dadab3e003583c015bc407a9c3c1b1e5d746d1ff1f4fbae3
#765    EST     info            instantiated
#774    TX      info            instantiated
      ✔ Should be able to flip value (3264ms)
Logs from pink server:
#776    EST     info            instantiated
#786    TX      info            instantiated
    new constructor
      ✔ Should be created with proper intial value
Logs from pink server:
#803    EST     info            instantiated
#811    TX      info            instantiated

[Test] Global teardown start
[Test] Internal clean up
[Test] Global teardown done

  3 passing (19s)

Done in 25.59s.
```

### 9. Running scripts

DevPHAse will run script on specified envionment.  
If environment provide PinkLogger - logs will be saved.

#### 9.1. Deploy contract 
```bash
yarn devphase script scripts/deploy.ts
```

Sample output:
```
yarn devphase script scripts/deploy.ts
yarn run v1.22.19
$ (...)/node_modules/.bin/devphase script scripts/deploy.ts
[Script] Executing (...)/scripts/deploy.ts
Contract ID: 0x4f8b6b3fa36ea999d54e984d04644bee8c51aca8422963741ddb0c5695c972df
{ Ok: false }
{
  Finalized: '0x3449fa9f88de5a915568387bd7b958e45c12f4b06a06784824a1620d990eab93'
}
{ Ok: true }
Done in 9.78s.
```

#### 9.2. Get logs
Using contract ID from previous script  
`0x4f8b6b3fa36ea999d54e984d04644bee8c51aca8422963741ddb0c5695c972df`  
modify contractIds variable in `scripts/get-logs.ts`

Run 
```bash
yarn devphase script scripts/get-logs.ts
```

Sample output:
```
yarn devphase script scripts/get-logs.ts
yarn run v1.22.19
$ (...)/node_modules/.bin/devphase script scripts/get-logs.ts
[Script] Executing (...)/scripts/get-logs.ts
0x4f8b6b3fa36ea999d54e984d04644bee8c51aca8422963741ddb0c5695c972df
[
  {
    sequence: 150,
    type: 'Log',
    blockNumber: 7319,
    contract: '0x4f8b6b3fa36ea999d54e984d04644bee8c51aca8422963741ddb0c5695c972df',
    entry: '0x4f8b6b3fa36ea999d54e984d04644bee8c51aca8422963741ddb0c5695c972df',
    execMode: 'estimating',
    timestamp: 2024-03-07T16:55:14.185Z,
    level: 3,
    message: 'instantiated'
  }
]
```


### 10. Run devPHAse on testnet / mainnet
You can specify to run commands on any network - including testnet or mainnet.  
Check commands help for further details.
