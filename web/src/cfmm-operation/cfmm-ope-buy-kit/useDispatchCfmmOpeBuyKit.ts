import { TzFormatTzToMutez, useAppDispatch } from '@config'
import BigNumber from 'bignumber.js'
import { CfmmOpeName, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { createCfmmOpeSubmitPayload } from '../state/cfmm-ope-state.utils'
import { cfmmOpeActions } from '../state/cfmm-ope.slice'

export const useDispatchCfmmOpeBuyKit = (checkerAdress: string) => {
  const dispatch = useAppDispatch()

  const executeBuyKit = (
    amount: number,
    minExpected: number,
    deadLine: number,
    slippage: number,
  ) => {
    const payload: CfmmOpeRowState = createCfmmOpeSubmitPayload(
      checkerAdress,
      CfmmOpeName.buy_kit,
      {
        amount: TzFormatTzToMutez(amount).toNumber(),
        minExpected: new BigNumber(minExpected - minExpected * slippage).toNumber(),
        deadLine: new Date(new Date().getTime() + deadLine * 60000),
      },
    )

    dispatch(cfmmOpeActions.buyKitSubmit(payload))
  }

  return {
    buyKit: (amount: number, minExpected: number, deadLine: number, slippage: number) =>
      executeBuyKit(amount, minExpected, deadLine, slippage),
  }
}
