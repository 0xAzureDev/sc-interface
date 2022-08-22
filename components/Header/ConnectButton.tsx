import { METAMASK_DOWNLOAD_LINK } from "constants/";
import { formatAddress } from "helpers";
import { FC } from "react";
import { ConnectButtonInterface } from "types";

const ConnectButton: FC<ConnectButtonInterface> = ({
  address,
  isMetamaskInstalled,
  chainId,
  disconnectWallet,
  connectWallet,
}) => {
  return (
    <>
      {address && isMetamaskInstalled ? (
        <>
          <button className="header-chain">{chainId?.toUpperCase() ?? "UNKNOWN"}</button>
          <button className="header-button" onClick={disconnectWallet}>
            {formatAddress(address)}
          </button>
        </>
      ) : isMetamaskInstalled ? (
        <button className="header-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <button className="header-button" onClick={() => window.open(METAMASK_DOWNLOAD_LINK)}>
          Install Metamask
        </button>
      )}
    </>
  );
};

export default ConnectButton;
