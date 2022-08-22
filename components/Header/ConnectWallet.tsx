import { ethers } from "ethers";
import { chainIdToName, isInstalled } from "helpers";
import { FC, useEffect, useState } from "react";
import ConnectButton from "./ConnectButton";

const ConnectWallet: FC = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(true);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isInstalled()) return setIsMetamaskInstalled(false);

    window.ethereum.on("chainChanged", () => {
      const chainIdName = chainIdToName(window.ethereum.chainId ?? "0x1");
      setChainId(chainIdName);
    });
  }, []);

  const connectWallet = async () => {
    if (!isInstalled()) return setIsMetamaskInstalled(false);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setAddress(address);

      const chainIdName = chainIdToName(window.ethereum.chainId ?? "0x1");
      setChainId(chainIdName);
    } catch (error) {
      console.error("Error connecting to wallet", error);
      alert(`Something went wrong connecting your wallet`);
    }
  };

  const disconnectWallet = () => setAddress(undefined);

  return (
    <>
      <ConnectButton
        address={address}
        isMetamaskInstalled={isMetamaskInstalled}
        chainId={chainId}
        disconnectWallet={disconnectWallet}
        connectWallet={connectWallet}
      />
    </>
  );
};

export default ConnectWallet;
