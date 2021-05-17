/* eslint-disable */
import { useGetWallet } from '@wallet'
import { userConnectedRoutes, userDisconnectedRoutes } from './checker-routes'

export const useCheckerRoute = () => {
  const { address } = useGetWallet()
  return {
    checkerRoutes: address ? userConnectedRoutes : userDisconnectedRoutes,
  }
}
