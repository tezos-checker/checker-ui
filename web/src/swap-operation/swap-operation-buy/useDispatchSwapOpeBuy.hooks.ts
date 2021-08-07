import { useAppDispatch } from '@config'
import { TzFormatTzToMutez } from '@wallet'
import { CfmmOpeName, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { createCfmmOpeSubmitPayload } from '../state/cfmm-ope-state.utils'
import { cfmmOpeActions } from '../state/cfmm-ope.slice'

export const useDispatchCfmmOpeBuyKit = (checkerAdress: string) => {
  const dispatch = useAppDispatch()

  const buy = (amount: number, minExpected: number, deadLine: number, slippage: number) => {
    const payload: CfmmOpeRowState = createCfmmOpeSubmitPayload(
      checkerAdress,
      CfmmOpeName.buy_kit,
      {
        amount: TzFormatTzToMutez(amount).toNumber(),
        minExpected: TzFormatTzToMutez(minExpected - minExpected * slippage)
          .integerValue()
          .toNumber(),
        deadLine: new Date(new Date().getTime() + deadLine * 60000),
      },
    )

    dispatch(cfmmOpeActions.buyKitSubmit(payload))
  }

  return {
    dispatchBuy: (amount: number, minExpected: number, deadLine: number, slippage: number) =>
      buy(amount, minExpected, deadLine, slippage),
  }
}
