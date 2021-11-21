import { useHooks } from "@components/providers/web3";
import { AccountResponse } from "@components/providers/web3/hooks/useAccount";
import { CampaignResponse } from "@components/providers/web3/hooks/useCampaign";
import { CampaignsResponse } from "@components/providers/web3/hooks/useCampaigns";
import { ExpenditureRequestsResponse } from "@components/providers/web3/hooks/useExpenditureRequests";
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

type UseCampaigns = {
  campaigns: ExtendedResponse<CampaignsResponse>;
};

type UseCampaign = {
  campaign: ExtendedResponse<CampaignResponse>;
};

type UseExpenditureRequests = {
  expenditureRequests: ExtendedResponse<ExpenditureRequestsResponse>;
};

const enhanceHook = <T extends SWRResponse<any, unknown>>(
  swrResponse: T
): ExtendedResponse<T> => {
  return {
    ...swrResponse,
    hasInitialResponse: swrResponse.data || swrResponse.error,
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

export const useCampaigns = (): UseCampaigns => {
  const swrResponse = enhanceHook<CampaignsResponse>(
    useHooks((hooks) => hooks.useCampaigns)()
  );
  return { campaigns: swrResponse };
};

export const useCampaign = (address: string | undefined): UseCampaign => {
  const swrResponse = enhanceHook<CampaignResponse>(
    useHooks((hooks) => hooks.useCampaign)(address)
  );
  return { campaign: swrResponse };
};

export const useExpenditureRequests = (
  address: string | undefined
): UseExpenditureRequests => {
  const swrResponse = enhanceHook<ExpenditureRequestsResponse>(
    useHooks((hooks) => hooks.useExpenditureRequests)(address)
  );
  return { expenditureRequests: swrResponse };
};
