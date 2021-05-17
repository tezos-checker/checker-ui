import { combineEpics } from 'redux-observable'
import { loadWalletEpic } from './epic/load-wallet-epic'

export const walletEpics = combineEpics(loadWalletEpic)
