// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public campaigns;

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _minimumContribution,
        string memory _imageUrl
    ) public {
        Campaign newCampaign = new Campaign(
            _title,
            _description,
            _fundingGoal,
            _minimumContribution,
            _imageUrl,
            msg.sender
        );
        campaigns.push(address(newCampaign));
    }

    function getCampaigns() public view returns (address[] memory) {
        return campaigns;
    }
}
