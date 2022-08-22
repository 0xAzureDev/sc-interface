import { METAMASK_DOWNLOAD_LINK } from "constants/";
import { isInstalled, transactViewFunction } from "helpers";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { contractAbi, contractAddress } from "store/contractSlice";
import { Abi } from "types";

const FunctionList: FC<Abi> = ({ name, inputs, outputs, stateMutability }) => {
  const [toggle, setToggle] = useState(false);
  const [paramInput, setInputs] = useState<{
    [key: string]: string;
  }>();
  const [response, setResponse] = useState<string>();

  const abi = useSelector(contractAbi);
  const contract = useSelector(contractAddress);

  async function submitTx() {
    // const instance = new ethers.Contract(address, selectedContract.abi, signer);
    // const tx = instance.functions[name](...inputs);
    // tx.send().then((res: any) => {
    //   console.log(res);
    // });
    // console.log(paramInput);
    let parsedParams: string[] = [];

    if (paramInput) {
      Object.entries(paramInput).forEach(([, value], _) => {
        // console.log("Key: ", key);
        // console.log("Value: ", value);
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
  }

  function handleInput(event: { target: { name: string; value: string } }) {
    const { name, value } = event.target;
    setInputs({
      ...(paramInput as { [key: string]: string }),
      [name]: value,
    });
  }

  return (
    <>
      <div className="function-list-container">
        <button className="header-button function" type="button" onClick={() => setToggle(!toggle)}>
          {name}
        </button>
        {toggle && (
          <div className="function-list-content-stats">
            <p>State Mutability: {stateMutability}</p>
            {inputs.length > 0 && <h3>Inputs:</h3>}
            {inputs.map((input: { name: string; type: string }, index) => {
              return (
                <>
                  <p>
                    [{index}] {input.type} {input.name}
                  </p>
                  <input
                    type={"text"}
                    className="interface-text-abi"
                    style={{ height: "2rem", width: "30%" }}
                    placeholder={input.type}
                    onChange={handleInput}
                    name={index.toString()}
                  ></input>
                </>
              );
            })}
            {outputs.length > 0 && <h3>Outputs:</h3>}
            {outputs.length === 0 && (
              <>
                <h3>No output!</h3> <br />
              </>
            )}
            {outputs.map((output: { name: string; type: string }, index) => {
              return (
                <p>
                  [{index}] {output.type} {output.name}
                </p>
              );
            })}
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
