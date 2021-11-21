// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract Campaign {
    struct ExpenditureRequest {
        string description;
        uint256 amount;
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
        uint256 _amount,
        address _recipient
    ) public onlyOwner {
        require(
            address(this).balance >= _amount,
            "Requesting more than available."
        );
        require(_recipient != owner, "Recipient cannot be the owner");
        ExpenditureRequest storage r = expenditureRequests[
            expenditureRequestsCount += 1
        ];
        r.description = _description;
        r.amount = _amount;
        r.recipient = _recipient;
    }

    function approveExpenditureRequest(uint256 _index) public {
        ExpenditureRequest storage request = expenditureRequests[_index];

        require(backers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount += 1;
    }

    function finalizeExpenditureRequest(uint256 _index) public onlyOwner {
        ExpenditureRequest storage request = expenditureRequests[_index];

        require(!request.complete);
        require(request.approvalCount > (backersCount / 2));

        (bool success, ) = request.recipient.call{value: request.amount}("");
        require(success, "Transfer failed.");
        request.complete = true;
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
