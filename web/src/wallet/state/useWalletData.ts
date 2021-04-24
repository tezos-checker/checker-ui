import { store } from '@config'
import { useSelector } from 'react-redux'
import { walletSelectors } from './wallet.slice'

const walletSelector = () => walletSelectors.selectById(store.getState(), '1') || null

export const walletData = () => {
  return useSelector(walletSelector)
}
