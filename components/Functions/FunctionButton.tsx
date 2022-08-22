import { METAMASK_DOWNLOAD_LINK } from "constants/";
import { isInstalled } from "helpers";
import { FC } from "react";
import { FunctionButtonInterface } from "types";

const FunctionButton: FC<FunctionButtonInterface> = ({ submitTx }) => {
  return (
    <>
      {isInstalled() ? (
        <button
          className="header-button function"
          type="button"
          style={{ marginBottom: "1rem", color: "#fff" }}
          onClick={submitTx}
        >
          Submit
        </button>
      ) : (
        <button
          className="header-button function"
          type="button"
          style={{ marginBottom: "1rem", color: "#fff" }}
          onClick={() => window.open(METAMASK_DOWNLOAD_LINK)}
        >
          Install Metamask
        </button>
      )}
    </>
  );
};

export default FunctionButton;
