import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

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
