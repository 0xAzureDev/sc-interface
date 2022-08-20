import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Abi = {
  constant: boolean;
  inputs: {
    name: string;
    type: string;
  }[];
  name: string;
  outputs: {
    name: string;
    type: string;
  }[];
  payable: boolean;
  stateMutability: string;
  type: string;
};

export type AbiInputs = Abi["inputs"];
export type AbiOutputs = Abi["outputs"];

export type AbiList = Abi[];

export type AbiObject = {
  payable: string;
  stateMutability: string;
  name: string;
  type: string;
  inputs: {
    name: string;
    type: string;
  }[];
  outputs: {
    name: string;
    type: string;
  }[];
};

export type AbiObjectList = {
  payable: string;
  stateMutability: string;
  name: string;
  type: string;
  inputs: {
    name: string;
    type: string;
  }[];
  outputs: {
    name: string;
    type: string;
  }[];
}[];
