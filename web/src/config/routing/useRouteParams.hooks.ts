import { mockedCheckers } from '@config'
import { useParams } from 'react-router-dom'

export const useRouteParams = () => {
  // eslint-disable-next-line
  // @ts-ignore
  const { address: checkerAddress } = useParams()

  return {
    checker: mockedCheckers.find((checker) => checker.address === checkerAddress),
  }
}
