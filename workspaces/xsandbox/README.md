# devPHAse sandbox

## 1. Compile contract
```shell
yarn devphase contract compile -c <contractName>
```
Example:
```shell
yarn devphase contract compile -c flipper
yarn run v1.22.19
$ (...)/node_modules/.bin/devphase contract compile -c flipper
[MultiContractExecutor] Criteria: flipper
[MultiContractExecutor] Matched contracts:
[MultiContractExecutor] flipper
[MultiContractExecutor] 
  ❯ flipper
  ✔ flipper
Done in 11.97s.
```

## 2. Run tests
```shell
yarn devphase contract test -s <testSuiteDir>
```
Example:
```shell
yarn devphase contract test -s flipper
yarn run v1.22.19
$ (...)/node_modules/.bin/devphase contract test -s flipper
[StackBinaryDownloader] Preparing Phala stack release
  ✔ Checking releases directory
  ✔ Checking target release binaries


[Test] Global setup start
[Test] Preparing dev stack
[StackManager] Starting stack
  ✔ Start node component
  ✔ Start pRuntime component
  ✔ Start pherry component
[Test] Init API
[Test] Setup environment
[StackSetupService] Starting stack setup with default version
  ✔ Fetch worker info
  ↓ Register worker [skipped]
  ✔ Register gatekeeper
  ✔ Load system contracts
  ✔ Upload Pink system code
  ✔ Verify cluster
  ✔ Create cluster
  ✔ Wait for cluster to be ready
  ✔ Create system contract API
[Test] Global setup done
[Test] Starting tests
  Flipper
    default constructor
      ✔ Should be created with proper intial value
    new constructor
      ✔ Should be created with proper intial value

[Test] Global teardown start
[Test] Internal clean up
[Test] Stopping stack
[Test] Global teardown done

  2 passing (30s)

Done in 33.19s.
```
