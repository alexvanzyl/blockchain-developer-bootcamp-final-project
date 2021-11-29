// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./Campaign.sol";

/// @title Factory contract for creating Campaigns
/// @author Alexander van Zyl
/// @notice Creates a new Campaign contract
/// @dev Used for creating and listing Campaigns
contract CampaignFactory {
    address[] public campaigns;

    /// @notice Create a new Campaign
    /// @param _title The title or name of the Campaign
    /// @param _description A brief description about the Campaign
    /// @param _fundingGoal Amount of funding in ether that the Campaign is trying to raise
    /// @param _minimumContribution The minimum amount in ether that a backer can contribute
    /// @param _imageURL Cover image URL fot the Campaign
    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _minimumContribution,
        string memory _imageURL
    ) public {
        Campaign newCampaign = new Campaign(
            _title,
            _description,
            _fundingGoal,
            _minimumContribution,
            _imageURL,
            msg.sender
        );
        campaigns.push(address(newCampaign));
    }

    /// @notice Get a list all Campaign contract addresses
    /// @return List of all Campaign contract addresses
    function getCampaigns() public view returns (address[] memory) {
        return campaigns;
    }
}
