const { ethers } = require("ethers");
const CampaignFactory = artifacts.require("CampaignFactory");

contract("CampaignFactory", function (accounts) {
  it("creates a new Campaign", async () => {
    const instance = await CampaignFactory.deployed();
    await instance.createCampaign(
      "Test Campaign",
      "A campaign for testing",
      ethers.utils.parseEther("100"),
      ethers.utils.parseEther("1"),
      "",
      { from: accounts[1] }
    );
    const campaigns = await instance.getCampaigns();
    assert(campaigns.length > 0);
  });
});
