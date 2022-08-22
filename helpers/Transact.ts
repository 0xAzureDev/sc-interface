import { ethers } from 'ethers'

const processArray = (arr: any): any[] => {
  let newArr = []

  for (let i = 0; i < arr.length; i++) {
    let val
    if (Array.isArray(arr[i])) {
      val = processArray(arr[i])
    } else {
      val = arr[i].toString()
    }
    newArr.push(val)
  }
  return newArr
}

export const transactView = async (
  name: string,
  abi: string,
  contract: string,
  params: string[],
) => {
  try {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as any,
      'any',
    )
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()

    const contractInstance = new ethers.Contract(contract, abi, signer)

    const result = await contractInstance[name](...params)

    // simple return type
    if (!Array.isArray(result)) return result.toString()

    // complex return type
    let processed = processArray([...result])

    return JSON.stringify(processed, null, 2)
  } catch (error) {
    console.error(error)
    alert(`Something went wrong transacting view function.`)
  }
}

export const transactNonPayable = async (
  name: string,
  abi: string,
  contract: string,
  params: string[],
) => {
  try {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as any,
      'any',
    )
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()

    const contractInstance = new ethers.Contract(contract, abi, signer)

    const tx = await contractInstance[name](...params)

    await tx.wait()

    return tx.hash
  } catch (error) {
    console.error(error)
    alert(`Something went wrong transacting nonpayable function.`)
  }
}
