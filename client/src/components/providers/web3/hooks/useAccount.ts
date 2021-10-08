import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const handler = (web3: ethers.providers.Web3Provider | null) => () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3?.listAccounts();
      if (accounts) setAccount(accounts[0]);
    };

    web3 && getAccount();
  });

  return {
    account,
  };
};
