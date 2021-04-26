import { RequestStatus } from '@api'
import { useAppDispatch } from '@config'
import { walletActions } from './wallet.slice'

export const useDispatchLoadWallet = () => {
  const dispatch = useAppDispatch()

  return () =>
    dispatch(
      walletActions.loadWallet({
        id: '1',
        status: RequestStatus.pending,
        errMsg: '',
        address: '',
      }),
    )
}
