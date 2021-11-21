#!/bin/bash
if [ -d "build" ]; then 
    rm -r build 
fi
npx truffle migrate && cp build/contracts/Campaign* client/src/contracts