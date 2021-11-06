import { useHooks } from "@components/providers/web3";
import { AccountResponse } from "@components/providers/web3/hooks/useAccount";
import { NetworkResponse } from "@components/providers/web3/hooks/useNetwork";
import { SWRResponse } from "swr";

type ExtendedResponse<T> = T & {
  hasInitialResponse: boolean;
};

type UseAccount = {
  account: ExtendedResponse<AccountResponse>;
};

type UseNetwork = {
  network: ExtendedResponse<NetworkResponse>;
};

const enhanceHook = <T extends SWRResponse<any, unknown>>(
  swrResponse: T
): ExtendedResponse<T> => {
  return {
    ...swrResponse,
    hasInitialResponse: !!(swrResponse.data || swrResponse.error),
  };
};

export const useAccount = (): UseAccount => {
  const swrResponse = enhanceHook<AccountResponse>(
    useHooks((hooks) => hooks.useAccount)()
  );
  return { account: swrResponse };
};

export const useNetwork = (): UseNetwork => {
  const swrResponse = enhanceHook<NetworkResponse>(
    useHooks((hooks) => hooks.useNetwork)()
  );
  return { network: swrResponse };
};
