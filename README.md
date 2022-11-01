# devPHAse
Development tool for Phala Phat contracts.

<!--
![](https://img.shields.io/badge/Coverage-97%25-83A603.svg?prefix=$coverage$)
-->

## Install

Add to your projects using package manager (yarn / npm)

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

### Usage sample
Check [usage sample](https://github.com/l00k/devphase-usage-sample) repo

### Sandbox
Check [sandbox environment](https://github.com/l00k/devphase-sandbox) repo for easy testing with up-to-date code

### TODO
[check here](./TODO.md)
