import { ethers } from "ethers";

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
