import { METAMASK_DOWNLOAD_LINK } from "constants/";
import { isInstalled, transactViewFunction } from "helpers";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { contractAbi, contractAddress } from "store/contractSlice";
import { Abi } from "types";
import FunctionInput from "./FunctionInput";
import FunctionOutput from "./FunctionOutput";

const FunctionList: FC<Abi> = ({ name, inputs, outputs, stateMutability }) => {
  const [toggle, setToggle] = useState(false);
  const [paramInput, setInputs] = useState<{
    [key: string]: string;
  }>();
  const [response, setResponse] = useState<string>();

  const abi = useSelector(contractAbi);
  const contract = useSelector(contractAddress);

  const submitTx = async () => {
    let parsedParams: string[] = [];

    if (paramInput) {
      Object.entries(paramInput).forEach(([, value], _) => {
        parsedParams.push(value);
      });
    }

    if (inputs.length === Object.keys(paramInput ?? 0).length && abi && contract) {
      if (stateMutability === "view") {
        const res = await transactViewFunction(name, abi, contract, parsedParams);
        if (res) setResponse(res.toString());
      } else if (stateMutability === "nonpayable") {
        const res = await transactViewFunction(name, abi, contract, parsedParams);
        if (res) setResponse(res.toString());
      } else {
        alert("No contract selected");
        // transactViewFunction(name);
      }
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({
      ...(paramInput as { [key: string]: string }),
      [name]: value,
    });
  };

  return (
    <>
      <div className="function-list-container">
        <button className="header-button function" type="button" onClick={() => setToggle(!toggle)}>
          {name}
        </button>
        {toggle && (
          <div className="function-list-content-stats">
            <p>State Mutability: {stateMutability}</p>

            <FunctionInput inputs={inputs} handleInput={handleInput} />

            <FunctionOutput outputs={outputs} />

            {response && <h2>Response: {response}</h2>}
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
          </div>
        )}
      </div>
    </>
  );
};

export default FunctionList;
