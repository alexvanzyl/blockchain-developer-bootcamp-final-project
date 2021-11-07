import { ethers } from "ethers";
import { useEffect } from "react";
import useSWR, { SWRResponse } from "swr";
import { ExternalProviderExtended } from "..";

// export interface AccountResponse
//   extends SWRResponse<string | undefined, unknown> {}

export const handler = (contract: ethers.Contract | null) => () => {
    // const { mutate, ...rest } = useSWR(
    //   () => (web3 ? "web3/accounts" : null),
    //   async () => {
    //     const accounts = await web3?.listAccounts();
    //     if (accounts) return accounts[0];
    //   }
    // );

    // const provider = web3?.provider;
    // useEffect(() => {
    //   provider &&
    //     (provider as ExternalProviderExtended).on(
    //       "accountsChanged",
    //       (accounts: string[]) => mutate(accounts[0] ?? null)
    //     );
    // }, [mutate, provider]);

    // return { mutate, ...rest };
  };
