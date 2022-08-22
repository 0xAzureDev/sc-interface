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

export type AbiInputs = {
  name: string;
  type: string;
};

export type AbiOutputs = {
  name: string;
  type: string;
};

export type AbiList = Abi[];

export interface ConnectButtonInterface {
  address?: string;
  isMetamaskInstalled: boolean;
  chainId?: string;
  disconnectWallet: () => void;
  connectWallet: () => void;
}

export interface InputFieldInterface {
  message: string;
  handleMessageChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface InputButtonInterface {
  paste: () => void;
  upload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FunctionInputInterface {
  inputs: AbiInputs[];
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FunctionOutputInterface {
  outputs: AbiOutputs[];
}
