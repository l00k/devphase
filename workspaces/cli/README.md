# devPHAse
Development tool for Phala Phat contracts.

*Tests for both latest devPHAse and Phala Blockchain release:*  
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/l00k/devphase/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/l00k/devphase/tree/master)


## Usage examples
Check [usage examples](workspaces/xexamples/docs/index.md)


## Type generation
devPHAse generates type bindings for all types used in contract, so all types and props should be suggested by your IDE.  
If any error / edge case occur please create issue.


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

## Sandbox
In directory `workspaces/xsandbox` there is a template of devphase project.  
You can try building and testing contracts.  
More info [here](./workspaces/xsandbox)

## Commands

I strongly recommned using scripts instead of CLI commands.  
[CLI commands index](./docs/cli-commands)


## Configuration

[Here is](./docs/config.ts) default configuration.  
All values are optional (merged recuresivly)  
