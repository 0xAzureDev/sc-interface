import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface ContractState {
  address: string | undefined
  contractAddress: string
  contractAbi: string
}

const initialState: ContractState = {
  address: undefined,
  contractAddress: '',
  contractAbi: '',
}

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string | undefined>) => {
      state.address = action.payload
    },
    updateContractAddress: (
      state: { contractAddress: string },
      action: PayloadAction<string>,
    ) => {
      state.contractAddress = action.payload
    },
    updateContractAbi: (
      state: { contractAbi: string },
      action: PayloadAction<string>,
    ) => {
      state.contractAbi = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setWalletAddress, updateContractAddress, updateContractAbi } =
  contractSlice.actions

export const walletAddress = (state: RootState) => state.contract.address
export const contractAddress = (state: RootState) =>
  state.contract.contractAddress
export const contractAbi = (state: RootState) => state.contract.contractAbi

export default contractSlice.reducer
