#!/bin/bash

rm -r workspaces/service/node_modules
rm -r workspaces/cli/node_modules
rm -r workspaces/cli-test/node_modules
rm -r workspaces/xsandbox/node_modules
[[ ! -e workspaces/phat-bricks/node_modules ]] || rm -r workspaces/phat-bricks/node_modules
rm -r node_modules

yarn install
