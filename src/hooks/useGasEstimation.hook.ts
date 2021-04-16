import BigNumber from 'bignumber.js'
import { useAsyncMemo } from 'use-async-memo'
import TokenService from '../services/tokenContract.service'
import { Action } from '../utils/types'

interface GasEstimation {
  gasLimit: string
  storageLimit: string
  suggestedFeeMutez: string
}

const useGasEstimation = (
  action: Action,
  metadata: {
    amount: Maybe<BigNumber>
    addressFrom: Maybe<string>
    addressTo: Maybe<string>
  },
  tokenService: TokenService,
): Maybe<GasEstimation> => {
  const gasEstimation: Maybe<GasEstimation> = useAsyncMemo(
    async () => {
      let estimate: Maybe<any> = null
      const { amount, addressFrom, addressTo } = metadata
      if (!amount) {
        return estimate
      }

      switch (action) {
        case Action.Allow:
          if (!amount || !addressTo) {
            return estimate
          }
          estimate = await tokenService.getGasEstimationForAllow(addressTo, amount)
          break
        case Action.Transfer:
          if (!amount || !addressFrom || !addressTo) {
            return estimate
          }
          estimate = await tokenService.getGasEstimationForTransfer(addressFrom, addressTo, amount)
          break
        default:
          throw Error(`useGasEstimation: action ${action}  doest not exist`)
      }

      return {
        gasLimit: estimate.gasLimit,
        storageLimit: estimate.storageLimit,
        suggestedFeeMutez: estimate.suggestedFeeMutez,
      }
    },
    [tokenService, action, metadata],
    null,
  )

  return gasEstimation
}

export default useGasEstimation
