import { ethers } from "ethers";
import { handler as createUseAccount, AccountResponse } from "./useAccount";
import { handler as createUseNetwork, NetworkResponse } from "./useNetwork";

export type Web3Hooks = {
  useAccount: () => AccountResponse;
  useNetwork: () => NetworkResponse;
};

export const setupHooks = (
  web3: ethers.providers.Web3Provider | null
): Web3Hooks => {
  return {
    useAccount: createUseAccount(web3),
    useNetwork: createUseNetwork(web3),
  };
};
