/* eslint-disable */
import { useWalletData } from '@wallet'
import { userConnectedRoutes, userDisconnectedRoutes } from './checker-routes'

export const useCheckerRoute = () => {
  const { address } = useWalletData()
  return {
    checkerRoutes: address ? userConnectedRoutes : userDisconnectedRoutes,
  }
}
