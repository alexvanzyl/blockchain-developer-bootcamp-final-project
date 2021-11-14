import { Campaign } from "@components/campaign/campaign";
import CampaignContract from "@contracts/Campaign.json";
import { ethers } from "ethers";
import useSWR, { SWRResponse } from "swr";

export interface CampaignResponse
  extends SWRResponse<Campaign | null, unknown> {}

export const handler =
  (web3: ethers.providers.Web3Provider | null) =>
  (address: string | undefined): CampaignResponse => {
    const swrResponse = useSWR(
      () => (web3 && address ? "web3/campaign" : null),
      async (): Promise<Campaign | null> => {
        if (!web3 || !address) return null;
        const campaignContract = new ethers.Contract(
          address,
          CampaignContract.abi,
          web3
        );
        const details = await campaignContract.getDetails();

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
    );

    return swrResponse;
  };
