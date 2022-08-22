import { FC } from "react";
import { AbiInputs, FunctionInputInterface } from "types";

const FunctionInput: FC<FunctionInputInterface> = ({ inputs, handleInput }) => {
  return (
    <>
      {inputs.length > 0 && <h3>Inputs:</h3>}
      {inputs.map((input: AbiInputs, index) => {
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
    </>
  );
};

export default FunctionInput;
