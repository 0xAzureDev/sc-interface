import { FC } from "react";
import { InputFieldInterface } from "types";

const InputField: FC<InputFieldInterface> = ({ message, handleMessageChange }) => {
  return (
    <>
      <div className="interface-container">
        <textarea
          className="interface-text-abi"
          name="paragraph_text"
          cols={50}
          rows={10}
          placeholder="Paste ABI here"
          value={message}
          onChange={handleMessageChange}
        ></textarea>
      </div>
    </>
  );
};

export default InputField;
