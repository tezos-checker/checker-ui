import { useAppDispatch } from '@config'
import BigNumber from 'bignumber.js'
import { CfmmOpeName, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { createCfmmOpeSubmitPayload } from '../state/cfmm-ope-state.utils'
import { cfmmOpeActions } from '../state/cfmm-ope.slice'

export const useDispatchCfmmOpeBuyKit = (checkerAdress: string) => {
  const dispatch = useAppDispatch()

  const executeBuyKit = (amount: number, minAmount: number, deadLine: Date) => {
    const payload: CfmmOpeRowState = createCfmmOpeSubmitPayload(
      checkerAdress,
      CfmmOpeName.buy_kit,
      {
        amount: new BigNumber(amount).toNumber(),
        minAmount,
        deadLine,
      },
    )

    dispatch(cfmmOpeActions.buyKitSubmit(payload))
  }

  return {
    buyKit: (amount: number, minAmount: number, deadLine: Date) =>
      executeBuyKit(amount, 1, deadLine),
  }
}
