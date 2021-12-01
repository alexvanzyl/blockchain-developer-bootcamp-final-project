# S🌱🌱D
## Demo
TBA

## Description
Siid (_pronounced seed_) is decentralized crowdfunding application that allows campaign backers to vote on how funding is spent by the campaign owners. The objective is to bring complete transparency to crowdfunding and mitigate fraudulent campaigns.

## Flows

### Campaign Owners

#### Campaign creation
1. User clicks on create campaign
2. Complete campaign creation form i.e title, description, funding goal etc.

#### Request to spend
1. Campaign owner clicks on create request
2. Completes the form, description, amount and the address the funds will be sent to.
3. Campaign owner must wait until at least 51% of backers support the spend request.
4. Submits the payment to receiving address.

### Campaign backers
#### Backing a campaign
1. Campaign backer clicks on the fund me button
2. Submit amount they wish to fund the campaign, must be the same or more than the minimum set by the campaign owner.

#### Approving purchase requests
1. Campaign backers have the option to approve/vote for a purchase request made by the campaign owner, but clicking approve button.

## Tech Stack
- Next.js
- TailwindCSS
- Solidity
- Truffle & Ganache
- Netlify


# Directory Structure
- `client` - Next.js user facing frontend
- `contracts` - Solidity contracts for this project
- `migrations` - Truffle deployment scripts  
- `scripts` - Helper scripts
- `test` - Contract unit tests

# Running project locally (Development)

## Prerequisites
- Node.js >= 14
- npm
- truffle
- ganache-cli

## Installation
### 1. Clone project 
```shell
> git clone https://github.com/alexvanzyl/blockchain-developer-bootcamp-final-project.git
```

### 2. Install truffle and ganache-cli
```shell
> npm install -g truffle
> npm install -g ganache-cli
```
### 3. Install contract and client dependencies
```shell
> cd blockchain-developer-bootcamp-final-project
> npm install
> cd client
> npm install
```

## Running project
### 1. Run `ganache-cli` in a separate terminal (_make sure to set the network ID to 5777_)
```shell
> ganache-cli -i 5777
```
### 2. Run the build script from the project root. 
This will deploy the contracts locally and copy the artifacts to the `client/src/contracts` directory.
```shell
> ./scripts/build
```
### 3. Start the client
```shell
> cd client
> npm run dev
```
Access the client at [http://localhost:3000/](http://localhost:3000/)

## Running test
### 1. Make sure `ganache-cli` is running in a separate terminal
```shell
> ganache-cli
```
### 2. Run `truffle test` form the project root.
```shell
> truffle test
```

# Public Ethereum wallet for certification
alexvanzyl.eth (0xA03E33A4Be781F2D603E20a948C09A67a34b4Dd1)