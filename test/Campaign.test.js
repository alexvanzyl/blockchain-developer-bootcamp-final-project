const { ethers } = require("ethers");
const Campaign = artifacts.require("Campaign");

const provider = new ethers.providers.JsonRpcProvider();

contract("Campaign", function (accounts) {
  const [
    campaignAddress,
    campaignOwnerAddress,
    backerAddress,
    recipientAddress,
  ] = accounts;

  let instance;
  const minimumContribution = ethers.utils.parseEther("2");
  beforeEach(async () => {
    instance = await Campaign.new(
      "Test Campaign",
      "A campaign for testing",
      ethers.utils.parseEther("100"),
      minimumContribution,
      "",
      campaignOwnerAddress,
      { from: campaignAddress }
    );
  });

  const createExpenditureRequest = async () => {
    await instance.createExpenditureRequest(
      "Some expenditure request",
      minimumContribution,
      recipientAddress,
      {
        from: campaignOwnerAddress,
      }
    );
  };

  const fundCampaign = async (address) => {
    await instance.fund({
      from: address || backerAddress,
      value: minimumContribution.toString(),
    });
  };

  it("should be owned by the owner", async () => {
    assert.equal(await instance.owner(), campaignOwnerAddress);
  });

  it("should only allow a funding amount more than or the same as the set minimum contribution", async () => {
    let fundingAmount = ethers.utils.parseEther("1");

    try {
      await instance.fund({
        from: backerAddress,
        value: fundingAmount.toString(),
      });
    } catch (err) {
      assert(err);
    }
  });

  it("should receive funding", async () => {
    let fundingAmount = ethers.utils.parseEther("5");

    await instance.fund({
      from: backerAddress,
      value: fundingAmount.toString(),
    });

    let balance = await provider.getBalance(instance.address);
    let totalFundingReceived = await instance.totalFundingReceived();
    assert.equal(balance.toString(), fundingAmount.toString());
    assert.equal(totalFundingReceived.toString(), fundingAmount.toString());
  });

  it("should only allow the campaign owner to create an expenditure request", async () => {
    try {
      await instance.createExpenditureRequest(
        "Some expenditure request",
        ethers.utils.parseEther("1"),
        recipientAddress,
        {
          from: accounts[4],
        }
      );
    } catch (err) {
      assert(err);
    }
  });

  it("shouldn't allow an expenditure request amount more than the contract balance", async () => {
    await fundCampaign();

    try {
      await instance.createExpenditureRequest(
        "Some expenditure request",
        ethers.utils.parseEther("3"),
        recipientAddress,
        {
          from: campaignOwnerAddress,
        }
      );
    } catch (err) {
      assert(err);
    }
  });

  it("shouldn't allow the recipient of an expenditure request to be the contract owner", async () => {
    await fundCampaign();

    try {
      await instance.createExpenditureRequest(
        "Some expenditure request",
        minimumContribution,
        campaignOwnerAddress,
        {
          from: campaignOwnerAddress,
        }
      );
    } catch (err) {
      assert(err);
    }
  });

  it("should create an expenditure request", async () => {
    await fundCampaign();

    await instance.createExpenditureRequest(
      "Some expenditure request",
      minimumContribution,
      recipientAddress,
      {
        from: campaignOwnerAddress,
      }
    );

    assert.equal(await instance.expenditureRequestsCount(), 1);
    const request = await instance.expenditureRequests(1);
    assert.equal(request.description, "Some expenditure request");
  });

  it("should allow only backers to approve expenditure requests", async () => {
    await fundCampaign();
    await createExpenditureRequest();

    try {
      await instance.approveExpenditureRequest(1, {
        from: campaignOwnerAddress,
      });
    } catch (err) {
      assert(err);
    }
  });

  it("should allow a backer to approve an expenditure request only once", async () => {
    await fundCampaign();
    await createExpenditureRequest();
    await instance.approveExpenditureRequest(1, {
      from: backerAddress,
    });

    try {
      await instance.approveExpenditureRequest(1, {
        from: backerAddress,
      });
    } catch (err) {
      assert(err);
    }
  });

  it("should approve an expenditure request", async () => {
    await fundCampaign();
    await createExpenditureRequest();
    await instance.approveExpenditureRequest(1, {
      from: backerAddress,
    });

    const request = await instance.expenditureRequests(1);
    assert.equal(request.approvalCount, 1);
  });

  it("should only allow the contract owner to finalize expenditure request", async () => {
    await fundCampaign();
    await createExpenditureRequest();

    try {
      await instance.finalizeExpenditureRequest(1, { from: backerAddress });
    } catch (err) {
      assert(err);
    }
  });

  it("shouldn't allow double finalization of an expenditure request", async () => {
    await fundCampaign();
    await createExpenditureRequest();
    await instance.approveExpenditureRequest(1, {
      from: backerAddress,
    });
    await instance.finalizeExpenditureRequest(1, {
      from: campaignOwnerAddress,
    });

    try {
      await instance.finalizeExpenditureRequest(1, {
        from: campaignOwnerAddress,
      });
    } catch (err) {
      assert(err);
    }
  });

  it("should only allow finalization of an expenditure request when more than 50% of the backers have approved it", async () => {
    await fundCampaign();
    await fundCampaign(accounts[5]);
    await createExpenditureRequest();
    await instance.approveExpenditureRequest(1, {
      from: backerAddress,
    });

    try {
      await instance.finalizeExpenditureRequest(1, {
        from: campaignOwnerAddress,
      });
    } catch (err) {
      assert(err);
    }
  });

  it("should finalize an expenditure request", async () => {
    const recipientInitialBalance = await provider.getBalance(recipientAddress);

    await fundCampaign();
    await createExpenditureRequest();
    await instance.approveExpenditureRequest(1, {
      from: backerAddress,
    });
    await instance.finalizeExpenditureRequest(1, {
      from: campaignOwnerAddress,
    });
    const request = await instance.expenditureRequests(1);
    assert(request.complete);
    assert(
      (await provider.getBalance(recipientAddress)) > recipientInitialBalance
    );
  });

  it("should get the campaign details", async () => {
    const details = await instance.getDetails();

    assert.equal(details[0], "Test Campaign");
    assert.equal(details[1], "A campaign for testing");
  });
});
