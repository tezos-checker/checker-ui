import { CheckerState } from '@config'
import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectWalletState = (state: CheckerState) => state.wallet

export const walletSelector = createDraftSafeSelector(selectWalletState, (walletState) => ({
  status: walletState.connectionStatus,
  address: walletState.address,
  errMsg: walletState.errMsg,
}))
