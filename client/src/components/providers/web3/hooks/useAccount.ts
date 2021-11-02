import { ethers } from "ethers";
import { useEffect } from "react";
import useSWR from "swr";

type ExternalProviderExtended = ethers.providers.ExternalProvider & {
  on: (event: string, cb: (...args: any[]) => void) => void;
};

export const handler = (web3: ethers.providers.Web3Provider | null) => () => {
  const { mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3?.listAccounts();
      if (accounts) return accounts[0];
    }
  );

  const provider = web3?.provider;
  useEffect(() => {
    provider &&
      (provider as ExternalProviderExtended).on(
        "accountsChanged",
        (accounts: string[]) => mutate(accounts[0] ?? null)
      );
  });

  return { account: { mutate, ...rest } };
};
