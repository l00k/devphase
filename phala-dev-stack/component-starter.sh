#!/bin/bash

[[ -e ./.env.dist ]] && source ./.env.dist
[[ -e ./.env ]] && source ./.env

case $1 in
    node)
        echo "Starting node"

        mkdir -p ./.data/node
        cd ./.data/node

        ../../bin/phala-node \
            --dev \
            --rpc-methods=Unsafe \
            --block-millisecs=$BLOCK_TIME
    ;;

    pruntime)
        echo "Starting pruntime"

        mkdir -p ./.data/pruntime
        cd ./.data/pruntime

        ../../bin/pruntime \
            --allow-cors \
            --cores=0 \
            --port 8000
    ;;

    pherry)
        echo "Waiting for node to start"

        while ! nc -z 127.0.0.1 9944; do
            echo -n "."
            sleep 1
        done

        echo -e "\nWaiting for node to pruntime"

        while ! nc -z 127.0.0.1 8000; do
            echo -n "."
            sleep 1
        done

        sleep 3

        echo -e "\nStarting pherry"

        ./bin/pherry \
            --no-wait \
            --mnemonic=//Alice \
            --inject-key=0000000000000000000000000000000000000000000000000000000000000001 \
            --substrate-ws-endpoint=ws://localhost:9944 \
            --pruntime-endpoint=http://localhost:8000 \
            --dev-wait-block-ms=$BLOCK_TIME
    ;;
esac

