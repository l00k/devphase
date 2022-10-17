# devPHAse
Development tool for Phala Phat contracts.

<!--
![](https://img.shields.io/badge/Coverage-97%25-83A603.svg?prefix=$coverage$)
-->

### How to use:
1. First step is building local Phala stack (node, pruntime and pherry). Check [official guide](https://wiki.phala.network/en-us/build/archived/run-a-local-development-network/).
2. Build your contract
3. Start the local stack.  
You may also try using `/dev-node/run.sh` from sandbox (check below) which will prepare all components with proper configuration.
4. Use devPHAse to deploy / test

### Try

Install
```shell
yarn install
```

Try script (deploy)
```shell
yarn deploy
```

or tests
```shell
yarn test
```

### Sandbox
Check [sandbox repo](https://github.com/l00k/devphase-sandbox)  

### TODO
[check here](./TODO.md)
