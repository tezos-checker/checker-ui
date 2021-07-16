/* eslint-disable */

import { routes } from '@config'
import { useGetWallet } from '@wallet'

export const useCheckerRoute = () => {
  const { address } = useGetWallet()
  return {
    checkerRoutes: address ? routes : routes.filter((route) => !route.isPrivate),
  }
}
