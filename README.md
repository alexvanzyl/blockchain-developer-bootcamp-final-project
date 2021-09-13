# S🌱🌱D

## Description
Siid (_pronouned seed_) is decentralized crowdfunding application that allows campaign backers to vote on how funding is spent by the campaign owners. The objective is to bring complete transparency to crowdfunding and mitigate fraudulent campaigns.

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
- Truffle
- Netlify