import { ethers } from "ethers";
import { AccountResponse, handler as createUseAccount } from "./useAccount";
import { CampaignResponse, handler as createUseCampaign } from "./useCampaign";
import {
  CampaignsResponse,
  handler as createUseCampaigns,
} from "./useCampaigns";
import {
  ExpenditureRequestsResponse,
  handler as createUseExpenditureRequests,
} from "./useExpenditureRequests";
import { handler as createUseNetwork, NetworkResponse } from "./useNetwork";

export type Web3Hooks = {
  useAccount: () => AccountResponse;
  useNetwork: () => NetworkResponse;
  useCampaigns: () => CampaignsResponse;
  useCampaign: (address: string | undefined) => CampaignResponse;
  useExpenditureRequests: (
    address: string | undefined
  ) => ExpenditureRequestsResponse;
};

type SetupHooksProps = {
  web3: ethers.providers.Web3Provider | null;
  contractFactory: ethers.Contract | null;
};

export const setupHooks = ({
  web3,
  contractFactory,
}: SetupHooksProps): Web3Hooks => {
  return {
    useAccount: createUseAccount(web3),
    useNetwork: createUseNetwork(web3),
    useCampaigns: createUseCampaigns({ web3, contractFactory }),
    useCampaign: createUseCampaign(web3),
    useExpenditureRequests: createUseExpenditureRequests(web3),
  };
};
