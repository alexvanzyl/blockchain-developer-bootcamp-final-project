import { Campaign } from "@components/campaign/campaign";
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
                id: index + 1,
                title: details[0],
                description: details[1],
                fundingGoal: parseInt(
                  ethers.utils.formatUnits(details[2], "ether")
                ),
                minimumContribution: parseInt(
                  ethers.utils.formatUnits(details[3], "ether")
                ),
                totalFundingReceived: parseInt(
                  ethers.utils.formatUnits(details[4], "ether")
                ),
                address: details[5],
                owner: details[6],
                imageUrl:
                  "https://globscoop.com/wp-content/uploads/2020/05/19654_tn_int-hyperloop-concept-priestmangoode.jpg",
                timestamp: Date.now(),
                backers: 10,
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
