#!/bin/bash

# verify required package
which tmuxp
if [[ $? != 0 ]]; then
    echo "Install tmuxp package"
    exit
fi

# clean up data directory
if [[ -e ./.data ]]; then
    rm -rf ./.data
fi

mkdir ./.data

# start tmux
tmuxp load ./tmuxp.config.yaml
