import { useAppDispatch } from '@config'
import { TzFormatTzToMutez } from '@wallet'
import { CfmmOpeName, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { createCfmmOpeSubmitPayload } from '../state/cfmm-ope-state.utils'
import { cfmmOpeActions } from '../state/cfmm-ope.slice'

export const useDispatchSwapOpeSell = (checkerAdress: string) => {
  const dispatch = useAppDispatch()

  const executeSellKit = (
    amount: number,
    minAmount: number,
    deadLine: number,
    slippage: number,
  ) => {
    const payload: CfmmOpeRowState = createCfmmOpeSubmitPayload(
      checkerAdress,
      CfmmOpeName.sell_kit,
      {
        amount: TzFormatTzToMutez(amount).toNumber(),
        minAmount: TzFormatTzToMutez(minAmount - minAmount * slippage)
          .integerValue()
          .toNumber(),
        deadLine: new Date(new Date().getTime() + deadLine * 60000),
      },
    )

    dispatch(cfmmOpeActions.sellKitSubmit(payload))
  }

  return {
    dispatchSell: (amount: number, minAmount: number, deadLine: number, slippage: number) =>
      executeSellKit(amount, minAmount, deadLine, slippage),
  }
}
