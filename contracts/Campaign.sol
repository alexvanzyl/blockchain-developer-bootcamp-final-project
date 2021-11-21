// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract Campaign {
    struct ExpenditureRequest {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    string public title;
    string public description;
    uint256 public fundingGoal;
    uint256 public totalFundingRecieved;
    uint256 public minimumContribution;
    string public imageURL;
    address public owner;
    mapping(address => bool) public backers;
    uint256 public backersCount;
    uint256 public timestamp;
    uint256 public expenditureRequestsCount;
    mapping(uint256 => ExpenditureRequest) public expenditureRequests;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(
        string memory _title,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _minimumContribution,
        string memory _imageURL,
        address _owner
    ) {
        title = _title;
        description = _description;
        fundingGoal = _fundingGoal;
        minimumContribution = _minimumContribution;
        imageURL = _imageURL;
        owner = _owner;
        timestamp = block.timestamp;
    }

    function fund() public payable {
        require(msg.value >= minimumContribution);

        if (backers[msg.sender] != true) {
            backersCount += 1;
        }
        backers[msg.sender] = true;
        totalFundingRecieved += msg.value;
    }

    function createExpenditureRequest(
        string memory _description,
        uint256 _value,
        address _recipient
    ) public onlyOwner {
        ExpenditureRequest storage r = expenditureRequests[
            expenditureRequestsCount += 1
        ];
        r.description = _description;
        r.value = _value;
        r.recipient = _recipient;
    }

    function approveExpenditureRequest(uint256 _index) public {
        // Allows the backer to approve the expenditure
    }

    function finalizeExpenditureRequest(uint256 _index) public {
        // check request has been approved by more than 50% of the backers
        // transfer funds to the recipent
        // mark request as complete
    }

    function getDetails()
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            string memory,
            uint256,
            address,
            address,
            uint256
        )
    {
        return (
            title,
            description,
            fundingGoal,
            minimumContribution,
            backersCount,
            imageURL,
            totalFundingRecieved,
            address(this),
            owner,
            timestamp
        );
    }
}
