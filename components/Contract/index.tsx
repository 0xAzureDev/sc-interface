import { FC } from "react";
import { useDispatch } from "react-redux";
import { updateContractAddress } from "store/contractSlice";

const ContractInterface: FC = () => {
  const dispatch = useDispatch();

  function handleContractAddress(event: React.ChangeEvent<HTMLInputElement> ) {
    dispatch(updateContractAddress(event.target.value));
  }

  return (
    <>
      <div className="interface-container-header">
        <h2 className="interface-container-abi-header">Contract Address</h2>
      </div>
      <div className="interface-container">
        <input
          className="interface-text-abi"
          style={{ height: "2rem" }}
          type="text"
          placeholder="0x..."
          onChange={handleContractAddress}
        ></input>
      </div>
    </>
  );
};

export default ContractInterface;
