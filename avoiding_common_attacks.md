# Security Considerations

## Function Default Visibility ([SWC-100](https://swcregistry.io/docs/SWC-100))
Visibility has been set on all functions.

## Floating Pragma ([SWC-103](https://swcregistry.io/docs/SWC-103))
Both the `CampaignFactory` and `Campaign` contract and locked to a fixed version `0.8.7`

## Unchecked Call Return Value ([SWC-104](https://swcregistry.io/docs/SWC-104))
The `call` return value in the `finalizeExpenditureRequest()` function within the `Campaign` contract is checked using `require`, if it fails the transaction is rolled back.
 
## Unprotected Ether Withdrawal ([SWC-105](https://swcregistry.io/docs/SWC-105))
`finalizeExpenditureRequest()` function within the `Campaign` contract is protected by the `onlyOwner` modifier.

## Reentrancy ([SWC-107](https://swcregistry.io/docs/SWC-107)) and 
### Checks-Effects-Interactions
State changes are avoided after making external calls

##  State Variable Default Visibility([SWC-108](https://swcregistry.io/docs/SWC-108))
Visibility has been set on all state variables.

## Message call with hardcoded gas amount ([SWC-134](https://swcregistry.io/docs/SWC-134))
### Proper use of call, delegatecall instead of send, transfer
In the `finalizeExpenditureRequest()` function `call.value` is used over `send` or `transfer`