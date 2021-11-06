import { ethers } from "ethers";
import { useEffect } from "react";
import useSWR, { SWRResponse } from "swr";
import { ExternalProviderExtended } from "..";

export interface NetworkResponse extends SWRResponse<string | undefined, unknown> {
  target: number;
  isSupported: boolean;
  isLoading: boolean;
}

const NETWORKS: Record<number, string> = {
  1: "Mainnet",
  3: "Rospten",
  4: "Rinkeby",
  5: "Goerli",
  42: "Kovan",
  1337: "Ganache",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3: ethers.providers.Web3Provider | null) => () => {
  const { data, error, mutate, ...rest } = useSWR(
    () => (web3 ? "webs/network" : null),
    async () => {
      const network = await web3?.getNetwork();
      if (network) return NETWORKS[network.chainId];
    }
  );

  const provider = web3?.provider;
  useEffect(() => {
    provider &&
      (provider as ExternalProviderExtended).on("chainChanged", (chainId) => {
        mutate(NETWORKS[parseInt(chainId, 16)]);
      });
  }, [provider, mutate]);

  return {
    network: {
      data,
      mutate,
      target: targetNetwork,
      isSupported: data === targetNetwork,
      isLoading: !data && !error,
      ...rest,
    },
  };
};
