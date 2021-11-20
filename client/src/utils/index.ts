import { Campaign } from "@components/campaign/models";
import { ethers } from "ethers";

export function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export function parseCampaignDetails(details: any[]): Campaign {
  return {
    title: details[0],
    description: details[1],
    fundingGoal: parseInt(ethers.utils.formatUnits(details[2], "ether")),
    minimumContribution: parseInt(
      ethers.utils.formatUnits(details[3], "ether")
    ),
    backers: parseInt(details[4]),
    imageURL: details[5],
    totalFundingReceived: parseInt(
      ethers.utils.formatUnits(details[6], "ether")
    ),
    address: details[7],
    owner: details[8],
    timestamp: new Date(details[9] * 1000),
  };
}
