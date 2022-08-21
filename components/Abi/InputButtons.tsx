import { FC, useRef } from "react";

interface Props {
  paste: () => void;
  upload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputButtons: FC<Props> = ({ paste, upload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="interface-container-header">
        <h2 className="interface-container-abi-header">ABI</h2>
        <div>
          <button className="header-button abi" onClick={paste}>
            Paste ABI
          </button>
          <input className="header-file-input" type="file" ref={inputRef} onChange={upload}></input>
          <button className="header-button abi" onClick={() => inputRef.current?.click()}>
            Upload ABI
          </button>
        </div>
      </div>
    </>
  );
};

export default InputButtons;
