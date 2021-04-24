import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { WalletPayload } from './wallet-state.type'

export const walletAdapter = createEntityAdapter<WalletPayload>()
export const walletSlice = createSlice({
  name: 'wallet',
  initialState: walletAdapter.getInitialState(),
  reducers: {
    loadWallet: walletAdapter.upsertOne,
  },
})

export const walletActions = walletSlice.actions
export const walletSelectors = walletAdapter.getSelectors<RootState>((state) => state.wallet)
