import { parseAbi } from "helpers";
import { FC, useEffect, useState } from "react";
import { store } from "store/store";
import { Abi, AbiList } from "types";
import FunctionList from "./FunctionList";

const ContractFunctions: FC = () => {
  let currentValue: string;
  const [abi, setAbi] = useState<AbiList | null>();

  useEffect(() => {
    return store.subscribe(handleMessageChange);
  }, [abi]);

  function handleMessageChange() {
    let previousValue = currentValue;
    currentValue = store.getState().contract.contractAbi;
    setAbi(null);
    if (previousValue !== currentValue) {
      try {
        JSON.parse(currentValue);
      } catch (e) {
        return;
      }

      const data = parseAbi(currentValue);

      if (!data) setAbi(null);

      setAbi(data);
    }
  }

  return (
    <>
      <div className="interface-container-header">
        <h2 className="interface-container-abi-header">Functions</h2>
      </div>
      {abi &&
        abi?.map((item: Abi) => {
          return (
            <FunctionList
              name={item.name}
              payable={item.payable}
              stateMutability={item.stateMutability}
              type={item.type}
              inputs={item.inputs}
              outputs={item.outputs}
              constant={""}
            />
          );
        })}
    </>
  );
};

export default ContractFunctions;
