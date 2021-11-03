import { ethers } from "ethers";
import { SWRResponse } from "swr";
import { handler as createUseAccount } from "./useAccount";
import { handler as createUseNetwork } from "./useNetwork";

export type Web3Hooks = {
  useAccount: () => { account: SWRResponse<string | undefined, unknown> };
  useNetwork: () => {
    network: SWRResponse<string | undefined, unknown>;
  };
};

export const setupHooks = (
  web3: ethers.providers.Web3Provider | null
): Web3Hooks => {
  return {
    useAccount: createUseAccount(web3),
    useNetwork: createUseNetwork(web3),
  };
};
