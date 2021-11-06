import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setupHooks, Web3Hooks } from "./hooks/setupHooks";

export type ExternalProviderExtended = ethers.providers.ExternalProvider & {
  on: (event: string, cb: (...args: any[]) => void) => void;
};

type Props = {
  children: React.ReactNode;
};

interface CreateWeb3State {
  provider: any | null;
  web3: ethers.providers.Web3Provider | null;
  contract: null;
  isLoading: boolean;
}

interface Web3State extends CreateWeb3State {
  hooks: Web3Hooks;
}

interface Web3Context extends Web3State {
  requireInstall: boolean;
  connect: () => Promise<void> | void;
}

const createWeb3State = ({
  web3,
  provider,
  contract,
  isLoading,
}: CreateWeb3State): Web3State => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: setupHooks(web3),
  };
};

const Web3Context = createContext({} as Web3Context);

export default function Web3Provider({ children }: Props): JSX.Element {
  const [web3Api, setWeb3Api] = useState<Web3State>(
    createWeb3State({
      provider: null,
      web3: null,
      contract: null,
      isLoading: true,
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider =
        (await detectEthereumProvider()) as ExternalProviderExtended;
      if (provider) {
        const web3 = new ethers.providers.Web3Provider(provider);
        setWeb3Api({
          provider,
          web3,
          contract: null,
          isLoading: false,
          hooks: setupHooks(web3),
        });
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error("Please install Metamask.");
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, isLoading } = web3Api;

    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: web3
        ? async () => {
            try {
              await web3.send("eth_requestAccounts", []);
            } catch {
              location.reload();
            }
          }
        : () =>
            console.log(
              "Cannot connect to Metamask, try reload your browser please."
            ),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks<T>(cb: (h: Web3Hooks) => T) {
  const { hooks } = useWeb3();
  return cb(hooks);
}
