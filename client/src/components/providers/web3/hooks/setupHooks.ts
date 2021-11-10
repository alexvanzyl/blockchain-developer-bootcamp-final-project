import { ethers } from "ethers";
import { AccountResponse, handler as createUseAccount } from "./useAccount";
import {
  CampaignsResponse,
  handler as createUseCampaigns,
} from "./useCampaigns";
import { handler as createUseNetwork, NetworkResponse } from "./useNetwork";

export type Web3Hooks = {
  useAccount: () => AccountResponse;
  useNetwork: () => NetworkResponse;
  useCampaigns: () => CampaignsResponse;
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
  };
};
