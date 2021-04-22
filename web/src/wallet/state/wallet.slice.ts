import { RequestStatus } from '@api'
import { createSlice } from '@reduxjs/toolkit'
import { WalletState } from './wallet-state.type'
import {
  WalletConnectErrorAction,
  walletConnectErrorReducer,
  walletConnectReducer,
  WalletConnectSuccessAction,
  walletConnectSuccessReducer,
} from './wallet/wallet-reducer'

// Define the initial state using that type
const initialState: WalletState = {
  address: '',
  connectionStatus: RequestStatus.idle,
  errMsg: '',
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    connect: (state) => walletConnectReducer(state),
    connectSuccess: (state, action: WalletConnectSuccessAction) =>
      walletConnectSuccessReducer(state, action),
    connectError: (state, action: WalletConnectErrorAction) =>
      walletConnectErrorReducer(state, action),
  },
})

export const walletActions = walletSlice.actions
