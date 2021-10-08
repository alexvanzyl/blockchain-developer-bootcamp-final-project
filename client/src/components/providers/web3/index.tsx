import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setupHooks, Web3Hooks } from "./hooks/setupHooks";

type Props = {
  children: React.ReactNode;
};

interface Web3State {
  provider: any | null;
  web3: ethers.providers.Web3Provider | null;
  contract: null;
  isLoading: boolean;
}

interface Web3Context extends Web3State {
  isWeb3Loaded: boolean;
  getHooks: () => Web3Hooks;
  connect: () => Promise<void> | void;
}

const initialState = {
  provider: null,
  web3: null,
  contract: null,
  isLoading: true,
};

const Web3Context = createContext({} as Web3Context);

export default function Web3Provider({ children }: Props): JSX.Element {
  const [web3Api, setWeb3Api] = useState<Web3State>(initialState);

  useEffect(() => {
    const loadProvider = async () => {
      const provider: any = await detectEthereumProvider();
      if (provider) {
        const web3 = new ethers.providers.Web3Provider(provider);
        setWeb3Api({
          provider,
          web3,
          contract: null,
          isLoading: false,
        });
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error("Please install Metamask.");
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, provider } = web3Api;

    return {
      ...web3Api,
      isWeb3Loaded: web3 != null,
      getHooks: () => setupHooks(web3),
      connect: provider
        ? async () => {
            try {
              await provider.request({ method: "eth_requestAccounts" });
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
  const { getHooks } = useWeb3();
  console.log("SSS");
  return cb(getHooks());
}
