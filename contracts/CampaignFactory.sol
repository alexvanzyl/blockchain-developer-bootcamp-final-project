// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public campaigns;

    function createCampaign(uint256 _fundingGoal, uint256 _minimumContribution)
        public
    {
        // Create new campaign
    }

    function getCampaigns() public view returns (address[] memory) {
        // List all campaigns
    }
}
