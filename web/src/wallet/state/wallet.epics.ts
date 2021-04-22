import { combineEpics } from 'redux-observable'
import { connectWalletEpic } from './wallet/wallet-epic'

export const walletEpics = combineEpics(connectWalletEpic)
