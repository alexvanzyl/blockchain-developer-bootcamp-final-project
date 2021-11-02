import { ethers } from "ethers";
import useSWR from "swr";

export const handler = (web3: ethers.providers.Web3Provider | null) => () => {
  const swrResponse = useSWR(
    () => (web3 ? "webs/network" : null),
    async () => {
      const network = web3?.getNetwork();
      if (network) return network;
    }
  );

  return { network: { ...swrResponse } };
};
