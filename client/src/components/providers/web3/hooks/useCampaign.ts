import { Campaign } from "@components/campaign/models";
import CampaignContract from "@contracts/Campaign.json";
import { ethers } from "ethers";
import { parseCampaignDetails } from "src/utils";
import useSWR, { SWRResponse } from "swr";

export interface CampaignResponse extends SWRResponse<Campaign | null, any> {}

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
        return parseCampaignDetails(details);
      }
    );

    return swrResponse;
  };
