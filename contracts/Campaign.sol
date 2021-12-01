// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Contract for managing a Campaign
/// @author Alexander van Zyl
/// @notice Allows the campaign owner to spend contract funds approved by backers
/// @dev A Campaign is created using the CampaignFactory contract and ownership is transfered to the message sender
contract Campaign is Ownable {
    struct ExpenditureRequest {
        string description;
        uint256 amount;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    /// @notice Title of the campaign
    string public title;
    /// @notice Brief description explaining the campaign
    string public description;
    /// @notice Amount of funding in ether that the campaign is trying to raise
    uint256 public fundingGoal;
    /// @notice The total amound of funding in ether that the campaign has recieved so far
    uint256 public totalFundingReceived;
    /// @notice The minimum amount in ether that a backer can contribute
    uint256 public minimumContribution;
    /// @notice The image URL for the campaigns' cover image.
    string public imageURL;
    /// @dev Mapping to check if the message sender has backed the campaign
    mapping(address => bool) private backers;
    /// @notice The number of backers that have contributed to the campaign
    uint256 public backersCount;
    /// @notice The timestamp of when the campaign was created
    uint256 public timestamp;
    /// @notice Number of expenditures request made by campaign owner
    uint256 public expenditureRequestsCount;
    /// @notice Mapping of expenditure requests by ID
    /// @dev Mapping of expenditures starting at index of 1
    mapping(uint256 => ExpenditureRequest) public expenditureRequests;

    /// @notice Emitted when new funding is recieved
    /// @param backerAddress The address of the backer funding the campaign
    event FundingRecieved(address indexed backerAddress);

    /// @notice Emitted when new expenditure is requested
    /// @param expenditureRequestIndex The index of the expenditure request
    /// @param recipientAddress The address of the recipient that will recieve the funds
    /// @param amount The amount that will be transfered to the recipient
    event NewExpenditureRequestCreated(
        uint256 expenditureRequestIndex,
        address indexed recipientAddress,
        uint256 amount
    );

    /// @notice Emitted when an expenditure request is approved by a backer
    /// @param expenditureRequestIndex The index of the expenditure request
    /// @param backersAddress The address of the backer that approved the expenditure request
    event ExpenditureRequestApproved(
        uint256 expenditureRequestIndex,
        address indexed backersAddress
    );

    /// @notice Emitted when an expenditure request is finalized
    /// @param expenditureRequestIndex The index of the expenditure request
    /// @param recipientAddress The address of the recipient that will recieve the funds
    /// @param amount The amount that will be transfered to the recipient
    event ExpenditureRequestFinalized(
        uint256 expenditureRequestIndex,
        address indexed recipientAddress,
        uint256 amount
    );

    modifier onlyBacker() {
        require(backers[msg.sender]);
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
        transferOwnership(_owner);
        title = _title;
        description = _description;
        fundingGoal = _fundingGoal;
        minimumContribution = _minimumContribution;
        imageURL = _imageURL;
        timestamp = block.timestamp;
    }

    /// @notice Send funding to campaign contract
    function fund() public payable {
        require(
            msg.value >= minimumContribution,
            "Value is less than the allowed minimum contribution."
        );

        if (backers[msg.sender] != true) {
            backersCount += 1;
        }
        backers[msg.sender] = true;
        totalFundingReceived += msg.value;
        emit FundingRecieved(msg.sender);
    }

    /// @notice Create expenditure request
    /// @param _description Short discription explaining what the funds will be spent on
    /// @param _amount The amount in ethers that will be transfered to the recipient
    /// @param _recipient The recipient address
    function createExpenditureRequest(
        string memory _description,
        uint256 _amount,
        address _recipient
    ) public onlyOwner {
        require(
            address(this).balance >= _amount,
            "Requesting more than available."
        );
        require(_recipient != owner(), "Recipient cannot be the owner");
        ExpenditureRequest storage r = expenditureRequests[
            expenditureRequestsCount += 1
        ];
        r.description = _description;
        r.amount = _amount;
        r.recipient = _recipient;
        emit NewExpenditureRequestCreated(
            expenditureRequestsCount,
            _recipient,
            _amount
        );
    }

    /// @notice Approve expenditure request
    /// @param _index The index of the expediture request being approved
    function approveExpenditureRequest(uint256 _index) public onlyBacker {
        ExpenditureRequest storage request = expenditureRequests[_index];

        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount += 1;
        emit ExpenditureRequestApproved(_index, msg.sender);
    }

    /// @notice Finalize expenditure and send funds to recipient
    /// @param _index The index of the expediture request being finilized
    function finalizeExpenditureRequest(uint256 _index) public onlyOwner {
        ExpenditureRequest storage request = expenditureRequests[_index];

        require(!request.complete);
        require(request.approvalCount > (backersCount / 2));

        request.complete = true;

        (bool success, ) = request.recipient.call{value: request.amount}("");
        require(success, "Transfer failed.");
        emit ExpenditureRequestFinalized(
            _index,
            request.recipient,
            request.amount
        );
    }

    /// @notice Get public details of the Campaign
    /// @return Returns all the Campaign details along with the contract address
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
            totalFundingReceived,
            address(this),
            owner(),
            timestamp
        );
    }
}
