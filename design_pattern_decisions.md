# Design Pattern Decisions

## Factory Pattern
All `Campaign` contracts are created using a factory contract `CampaignFactory`. Ownership of the `Campaign` contract is then transferred to the `msg.sender`.

## Inheritance and Interfaces
The `Campaign` contract inherits from OpenZepplins' `Ownable` contract. Ownership of the `Campaign` contract is transferred to the `msg.sender` on creation using the inherited function `transferOwnership()`.

## Access Control Patterns
`Ownable` design pattern is used to protect the `createExpenditureRequest()` and `finalizeExpenditureRequest()` function of the `Campaign` contract using the `onlyOwner` modifier, allowing only the owner of the contract to execute them. 
