#!/bin/bash
if [ -d "build" ]; then 
    rm -r build 
fi
npx truffle migrate --network rinkeby && cp build/contracts/Campaign* client/src/contracts