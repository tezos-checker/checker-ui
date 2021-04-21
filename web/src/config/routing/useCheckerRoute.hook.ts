/* eslint-disable */
import { useConnectedContext } from '../../_old_/state/connected.context'
import { checkerRoutes } from './checker-routes'

export const useCheckerRoute = () => {
  const { account } = useConnectedContext()
  return {
    checkerRoutes: account ? checkerRoutes : checkerRoutes.filter((x) => !x.isPrivate),
  }
}
