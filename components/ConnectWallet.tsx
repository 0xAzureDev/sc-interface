import { ethers } from "ethers";
import { chainIdToName, formatAddress } from "helpers";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProvider, setSigner, setWalletAddress } from "store/contractSlice";

const ConnectWallet: FC = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(true);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.ethereum) return setIsMetamaskInstalled(false);

    window.ethereum.on("chainChanged", () =>
      setChainId(chainIdToName(window.ethereum.chainId ?? "0x1"))
    );
  }, []);

  async function connectWallet() {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any, "any");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setAddress(address);
      setChainId(chainIdToName(window.ethereum.chainId ?? "0x1"));
      
      dispatch(setProvider(provider));
      dispatch(setSigner(signer));
      dispatch(setWalletAddress(address));
    } catch (error) {
      alert(`Something went wrong connecting your wallet`);
    }
    // window.ethereum
    //   .request({
    //     method: "eth_requestAccounts",
    //   })
    //   .then(async (accounts: string[] | unknown) => {
    //     if (!Array.isArray(accounts))
    //       return alert(`Something went wrong with the received accounts!`);

    //     setAddress(accounts[0]);
    //     setChainId(chainIdToName(window.ethereum.chainId ?? "0x1"));

    //   })
    //   .catch((error) => {
    //     alert(`Something went wrong: ${error}`);
    //   });
  }

  function disconnectWallet() {
    setAddress(undefined);
  }

  return (
    <>
      {address && isMetamaskInstalled ? (
        <>
          <button className="header-chain">{chainId?.toLocaleUpperCase()}</button>
          <button className="header-button" onClick={disconnectWallet}>
            {formatAddress(address)}
          </button>
        </>
      ) : isMetamaskInstalled ? (
        <button className="header-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <button
          className="header-button"
          onClick={() => window.open("https://metamask.io/download/")}
        >
          Install Metamask
        </button>
      )}
    </>
  );
};

export default ConnectWallet;
