/* eslint-disable */
import { useConnectedContext } from '../state/connected.context'
import { appRoutes } from './app-routes.constant'

export const useAppRoutes = () => {
  const { account } = useConnectedContext()
  return {
    appRoutes: account ? appRoutes : appRoutes.filter((x) => !x.isPrivate),
  }
}
