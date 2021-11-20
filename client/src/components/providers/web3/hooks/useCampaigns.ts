import { Campaign } from "@components/campaign/models";
import CampaignContract from "@contracts/Campaign.json";
import { ethers } from "ethers";
import useSWR, { SWRResponse } from "swr";

export interface CampaignsResponse extends SWRResponse<Campaign[], unknown> {}

type HandlerProps = {
  web3: ethers.providers.Web3Provider | null;
  contractFactory: ethers.Contract | null;
};

export const handler =
  ({ web3, contractFactory }: HandlerProps) =>
  (): CampaignsResponse => {
    const swrResponse = useSWR(
      () => (web3 && contractFactory ? "web3/campaigns" : null),
      async () => {
        let campaigns: Campaign[] = [];
        if (web3 && contractFactory) {
          const factory = contractFactory.connect(web3);
          const campaignAddresses = await factory.getCampaigns();
          campaigns = campaignAddresses.map(
            async (address: string, index: number) => {
              const campaignContract = new ethers.Contract(
                address,
                CampaignContract.abi,
                web3
              );
              const details = await campaignContract.getDetails();
              return {
                title: details[0],
                description: details[1],
                fundingGoal: parseInt(
                  ethers.utils.formatUnits(details[2], "ether")
                ),
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
        }

        campaigns = await Promise.all(campaigns);
        return campaigns;
      }
    );

    return swrResponse;
  };
