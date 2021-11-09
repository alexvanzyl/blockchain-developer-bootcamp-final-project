#!/bin/bash
rm -r build && npx truffle migrate && cp build/contracts/Campaign* client/src/contracts