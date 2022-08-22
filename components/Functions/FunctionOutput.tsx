import { FC } from "react";
import { AbiOutputs, FunctionOutputInterface } from "types";

const FunctionOutput: FC<FunctionOutputInterface> = ({ outputs }) => {
  return (
    <>
      {outputs.length > 0 && <h3>Outputs:</h3>}
      {outputs.length === 0 && (
        <>
          <h3>No output!</h3> <br />
        </>
      )}
      {outputs.map((output: AbiOutputs, index) => {
        return (
          <p>
            [{index}] {output.type} {output.name}
          </p>
        );
      })}
    </>
  );
};

export default FunctionOutput;
