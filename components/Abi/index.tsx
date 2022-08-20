import { FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateContractAbi } from "store/contractSlice";

const ABIInterface: FC = () => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  function paste() {
    try {
      navigator.clipboard
        .readText()
        .then((text) => {
          setMessage(prettyPrint(text));
          dispatch(updateContractAbi(text));
        })
        .catch((err) => {
          console.error("Failed to read clipboard contents: ", err);
        });
    } catch (error) {
      alert("Pasting from clipboard is not supported on Firefox browsers.");
    }
  }

  function prettyPrint(text: string) {
    try {
      var obj = JSON.parse(text);
      var pretty = JSON.stringify(obj, undefined, 2);
      return pretty;
    } catch (e) {
      return text;
    }
  }

  const handleMessageChange = (event: { target: { value: any } }) => {
    setMessage(prettyPrint(event.target.value));
    dispatch(updateContractAbi(event.target.value));
  };

  function upload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsText(file as Blob);
      reader.onload = () => {
        setMessage(reader.result as string);
        dispatch(updateContractAbi(reader.result as string));
      };
    } catch (_) {}
  }

  return (
    <>
      <div className="interface-container-header">
        <h2 className="interface-container-abi-header">ABI</h2>
        <div>
          <button className="header-button abi" onClick={paste}>
            Paste ABI
          </button>
          <input
            className="header-file-input"
            type="file"
            ref={inputRef}
            onChange={(e) => upload(e)}
          ></input>
          <button className="header-button abi" onClick={() => inputRef.current?.click()}>
            Upload ABI
          </button>
        </div>
      </div>
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

export default ABIInterface;
