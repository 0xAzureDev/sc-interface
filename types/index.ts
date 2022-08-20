import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Abi = {
  constant: string;
  inputs: {
    name: string;
    type: string;
  }[];
  name: string;
  outputs: {
    name: string;
    type: string;
  }[];
  payable: string;
  stateMutability: string;
  type: string;
};

export type AbiInputs = Abi["inputs"];
export type AbiOutputs = Abi["outputs"];

export type AbiList = Abi[];