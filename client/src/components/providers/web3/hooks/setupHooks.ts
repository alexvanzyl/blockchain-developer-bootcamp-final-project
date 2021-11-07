import { ethers } from "ethers";
import { AccountResponse, handler as createUseAccount } from "./useAccount";
import { handler as createUseNetwork, NetworkResponse } from "./useNetwork";

export type Web3Hooks = {
  useAccount: () => AccountResponse;
  useNetwork: () => NetworkResponse;
};

type SetupHooksProps = {
  web3: ethers.providers.Web3Provider | null;
  contract: ethers.Contract | null;
};

export const setupHooks = ({ web3, contract }: SetupHooksProps): Web3Hooks => {
  return {
    useAccount: createUseAccount(web3),
    useNetwork: createUseNetwork(web3),
    // useCampaignFactory: createUseCampaigns(contract),
  };
};
