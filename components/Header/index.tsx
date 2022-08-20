import { FC } from "react";
import ConnectWallet from "./ConnectWallet";

const Header: FC = () => {
  return (
    <>
      <div className="header-container">
        <h1>SC Interface </h1>
        <div>
          <ConnectWallet />
        </div>
      </div>
    </>
  );
};

export default Header;
