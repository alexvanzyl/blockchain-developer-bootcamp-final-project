import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const handler = (web3: ethers.providers.Web3Provider | null) => () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3?.listAccounts();
      if (accounts) setAccount(accounts[0]);
    };

    getAccount();
  });

  useEffect(() => {
    web3?.provider.on("accountsChanged", (accounts: string[]) =>
      setAccount(accounts[0] ?? null)
    );
  });

  return {
    account,
  };
};
