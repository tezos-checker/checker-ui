import { RequestStatus, useAppDispatch } from '@config'
import { walletActions } from '../state/wallet.slice'

export const useConnectWallet = () => {
  const dispatch = useAppDispatch()

  return () =>
    dispatch(
      walletActions.loadWallet({
        id: 1,
        status: RequestStatus.pending,
        errMsg: '',
        address: undefined,
      }),
    )
}
