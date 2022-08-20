import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { RootState } from './store'

export interface ContractState {
  provider: ethers.providers.Web3Provider | null
  signer: ethers.Signer | null
  address: string | null
  contractAddress: string
  contractAbi: string
}

const initialState: ContractState = {
  provider: null,
  signer: null,
  address: null,
  contractAddress: '',
  contractAbi: '',
}

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<ethers.providers.Web3Provider>) => {
      state.provider = action.payload
    },
    setSigner: (state, action: PayloadAction<ethers.Signer>) => {
      state.signer = action.payload
    },
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload
    },
    updateContractAddress: (state: { contractAddress: string }, action: PayloadAction<string>) => {
      state.contractAddress = action.payload
    },
    updateContractAbi: (state: { contractAbi: string }, action: PayloadAction<string>) => {
      state.contractAbi = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProvider, setSigner, setWalletAddress, updateContractAddress, updateContractAbi } = contractSlice.actions

export const provider = (state: RootState) => state.contract.provider
export const signer = (state: RootState) => state.contract.signer
export const address = (state: RootState) => state.contract.address
export const contractAddress = (state: RootState) => state.contract.contractAddress
export const contractAbi = (state: RootState) => state.contract.contractAbi

export default contractSlice.reducer
