import { FC } from "react";

interface Props {
  message: string;
  handleMessageChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputField: FC<Props> = ({ message, handleMessageChange }) => {
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
