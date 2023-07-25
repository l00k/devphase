#!/bin/bash

set -e

[[ ! -e workspaces/phat-bricks ]] || rm -rf workspaces/phat-bricks

git clone https://github.com/Phala-Network/phat-bricks.git workspaces/phat-bricks

find workspaces/phat-bricks -mindepth 1 -maxdepth 1 -not -path "*phat" -exec rm -rf {} \;
mv workspaces/phat-bricks/phat/* workspaces/phat-bricks
rm -rf workspaces/phat-bricks/phat

sed -i 's/"@devphase\/cli": .*/"@devphase\/cli": "*",/' workspaces/phat-bricks/package.json

./reinstall.sh
