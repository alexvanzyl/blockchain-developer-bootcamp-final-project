import { ExpenditureRequest } from "@components/campaign/models";
import CampaignContract from "@contracts/Campaign.json";
import { ethers } from "ethers";
import useSWR, { SWRResponse } from "swr";

export interface ExpenditureRequestsResponse
  extends SWRResponse<ExpenditureRequest[], any> {}

export const handler =
  (web3: ethers.providers.Web3Provider | null) =>
  (address: string | undefined): ExpenditureRequestsResponse => {
    const swrResponse = useSWR(
      () => (web3 && address ? "web3/expenditureRequests" : null),
      async (): Promise<ExpenditureRequest[]> => {
        if (!web3 || !address) return [];
        const campaignContract = new ethers.Contract(
          address,
          CampaignContract.abi,
          web3
        );

        const expenditureRequestsCount =
          await campaignContract.expenditureRequestsCount();
        const requests: ExpenditureRequest[] = await Promise.all(
          Array(parseInt(expenditureRequestsCount))
            .fill({})
            .map((_, index) => {
              return campaignContract.expenditureRequests[index];
            })
        );

        return requests;
      }
    );

    return swrResponse;
  };
