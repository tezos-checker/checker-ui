import { RequestStatus, useAppDispatch } from '@config'
import { beaconWallet } from '@wallet'
import { walletActions } from '../state/wallet.slice'

export const useDisconnectWallet = () => {
  const dispatch = useAppDispatch()

  return () => {
    beaconWallet.clearActiveAccount()
    dispatch(
      walletActions.loadWallet({
        id: 1,
        status: RequestStatus.idle,
        errMsg: '',
        address: undefined,
      }),
    )
  }
}
