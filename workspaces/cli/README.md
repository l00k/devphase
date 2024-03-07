# devPHAse
Development tool for Phala Phat contracts.  

*Tests for both latest devPHAse and Phala Blockchain release:*  
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/l00k/devphase/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/l00k/devphase/tree/master)

<!--
## Usage examples
Check [usage examples](workspaces/xexamples/docs/index.md)
-->

## Features

Tool is heavily inspired by Hardhat (EVM devs should be familiar with it).  
I tried to provide as much similar features as possible.

- **Up to date Phala binaries**  
By default on each start devPHAse will pull latest Phala binaries (the latest release from official Phala's repo).

- **E2E testing**  
Using internally Phala stack (prepared on start) you can test e2e your contracts with minimal cost.

- **Scripting**  
Using all devPHAse API you can prepare scripts for common actions like: contract deployment, management, monitoring etc. 

- **Type generation**  
devPHAse generates type bindings for all structures used in contract, so autosuggestions should be provided by your IDE.  

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
1. Add devPHAse to your project dependencies (`yarn@^1` / `npm`)  
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

## Usage
Detailed usage described here  
[USAGE](./docs/usage.md)  
Must read :)  


## Sandbox & Examples
In directory `workspaces/xsandbox` there is a template of devphase project.  
You can try building and testing contracts.  
[workspaces/xsandbox](./workspaces/xsandbox)

Check also `workspaces/xexamples` for more examples.  
[workspaces/xexamples](./workspaces/xexamples)

## Commands

I strongly recommned using scripts instead of CLI commands.  
[CLI commands index](./docs/cli-commands.md)


## Configuration

[Here is](./docs/config.ts) default configuration.  
All values are optional (merged recuresivly)  
