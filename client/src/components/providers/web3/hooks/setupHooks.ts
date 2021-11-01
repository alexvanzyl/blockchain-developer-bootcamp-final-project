import { ethers } from "ethers";
import { handler as createUseAccount } from "./useAccount";

export type Web3Hooks = {
  useAccount: () => { account: string | null };
};

export const setupHooks = (
  web3: ethers.providers.Web3Provider | null
): Web3Hooks => {
  return {
    useAccount: createUseAccount(web3),
  };
};
