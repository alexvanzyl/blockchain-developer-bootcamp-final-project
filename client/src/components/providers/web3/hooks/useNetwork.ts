import { ethers } from "ethers";
import { useEffect } from "react";
import useSWR from "swr";
import { ExternalProviderExtended } from "..";

const NETWORKS: Record<number, string> = {
  1: "Mainnet",
  3: "Rospten",
  4: "Rinkeby",
  5: "Goerli",
  42: "Kovan",
  1337: "Ganache",
};

export const handler = (web3: ethers.providers.Web3Provider | null) => () => {
  const { mutate, ...rest } = useSWR(
    () => (web3 ? "webs/network" : null),
    async () => {
      const network = await web3?.getNetwork();
      if (network) return NETWORKS[network.chainId];
    }
  );

  useEffect(() => {
    const provider = web3?.provider;
    provider &&
      (provider as ExternalProviderExtended).on("chainChanged", (chainId) => {
        mutate(NETWORKS[parseInt(chainId, 16)]);
      });
  });

  return { network: { mutate, ...rest } };
};
