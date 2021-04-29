import { store } from '@config'
import { useSelector } from 'react-redux'
import { WalletRowState } from './wallet-state.type'
import { walletSelectors } from './wallet.slice'

const walletSelector = () => walletSelectors.selectById(store.getState(), 1)

export const useWalletData = () => useSelector(walletSelector) as WalletRowState
