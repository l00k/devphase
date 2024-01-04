#!/bin/bash

rm -r workspaces/service/node_modules
rm -r workspaces/cli/node_modules
rm -r workspaces/cli-test/node_modules
rm -r workspaces/xsandbox/node_modules
rm -r workspaces/xexamples/node_modules
rm -r node_modules

yarn install
