import { RequestStatus, RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { WalletRowState } from './wallet-state.type'

const initialState = {
  ids: [1],
  entities: {
    1: {
      id: 1,
      status: RequestStatus.idle,
      errMsg: '',
      address: undefined,
    },
  },
}

export const walletAdapter = createEntityAdapter<WalletRowState>()
export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    loadWallet: walletAdapter.upsertOne,
  },
})

export const walletActions = walletSlice.actions
export const walletSelectors = walletAdapter.getSelectors<RootState>((state) => state.wallet)
