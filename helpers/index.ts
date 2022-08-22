import { CHAIN_IDS } from "constants/";
import { ethers } from "ethers";
import { Abi } from "types";

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
};

export const chainIdToName = (chainId: string) => {
  return (CHAIN_IDS as any)[parseInt(chainId, 16)] || "unknown";
};

export const prettyPrint = (text: string) => {
  try {
    var obj = JSON.parse(text);
    return JSON.stringify(obj, undefined, 2);
  } catch (error) {
    return text;
  }
};

export const isInstalled = () => {
  return window.ethereum;
};

export const validateAbi = (rawAbi: any) => {
  let abi: JSON;

  try {
    abi = JSON.parse(rawAbi);
  } catch (error) {
    return false;
  }

  return Array.isArray(abi) && abi.length > 0 && abi.every((x) => x.type);
};

export const parseAbi = (abi: any) => {
  if (!validateAbi(abi)) return false;

  const jsonAbi = JSON.parse(abi);

  return jsonAbi
    .map((x: Abi) => {
      return {
        name: x.name,
        type: x.type,
        inputs: x.inputs,
        outputs: x.outputs,
        stateMutability: x.stateMutability,
        payable: x.payable,
      };
    })
    .filter((x: { type: string }) => x.type === "function");
};

export const transactViewFunction = async (
  name: string,
  abi: string,
  contract: string,
  params: string[]
) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contractInstance = new ethers.Contract(contract, abi, signer);

    return await contractInstance[name](...params);
  } catch (error) {
    alert(`Something went wrong connecting your wallet`);
  }
};
