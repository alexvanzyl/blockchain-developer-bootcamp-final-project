// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract Campaign {
    string public title;
    string public description;
    uint256 public fundingGoal;
    uint256 public totalFundingRecieved;
    uint256 public minimumContribution;
    address public owner;

    constructor(
        string memory _title,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _minimumContribution,
        address _owner
    ) {
        title = _title;
        description = _description;
        fundingGoal = _fundingGoal;
        minimumContribution = _minimumContribution;
        owner = _owner;
    }

    function fund(uint256 _amount) public payable {
        // Fund the campaign should be equal to or more than min. contribution
    }

    function createExpenditureRequest(
        string memory _description,
        uint256 _amount,
        address _recipient
    ) public {
        // Create an expenditure request that will need to be approved by the backers.
    }

    function approveExpenditureRequest(uint256 _index) public {
        // Allows the backer to approve the expenditure
    }

    function finalizeExpenditureRequest(uint256 _index) public {
        // check request has been approved by more than 50% of the backers
        // transfer funds to the recipent
        // mark request as complete
    }

    function getDetails() public view {
        // return campaign details
    }
}
