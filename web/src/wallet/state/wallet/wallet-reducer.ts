/*  eslint no-param-reassign: "error" */
import { RequestStatus } from '@api'
import { PayloadAction } from '@reduxjs/toolkit'
import { WalletState } from '../wallet-state.type'

export type WalletConnectAction = PayloadAction<null>
export type WalletConnectErrorAction = PayloadAction<string>
export type WalletConnectSuccessAction = PayloadAction<string>

export const walletConnectReducer = (state: WalletState): WalletState => ({
  ...state,
  connectionStatus: RequestStatus.pending,
})

export const walletConnectSuccessReducer = (
  state: WalletState,
  action: WalletConnectSuccessAction,
): WalletState => ({ ...state, address: action.payload, connectionStatus: RequestStatus.success })

export const walletConnectErrorReducer = (
  state: WalletState,
  action: WalletConnectSuccessAction,
): WalletState => ({
  ...state,
  errMsg: action.payload,
  address: '',
  connectionStatus: RequestStatus.error,
})
