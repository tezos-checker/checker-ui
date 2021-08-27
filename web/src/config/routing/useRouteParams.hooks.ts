import { appNetwork } from '@wallet'
import { useParams } from 'react-router-dom'

export const useRouteParams = () => {
  // eslint-disable-next-line
  // @ts-ignore
  const { address: checkerAddress } = useParams()

  return {
    checker: appNetwork.checkers.find((checker) => checker.address === checkerAddress),
  }
}
