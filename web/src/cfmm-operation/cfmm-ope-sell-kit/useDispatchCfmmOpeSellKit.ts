import { useAppDispatch } from '@config'
import { TzFormatTzToMutez } from '@shared/utils'
import { CfmmOpeName, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { createCfmmOpeSubmitPayload } from '../state/cfmm-ope-state.utils'
import { cfmmOpeActions } from '../state/cfmm-ope.slice'

export const useDispatchCfmmOpeSellKit = (callBack: () => void) => {
  const dispatch = useAppDispatch()

  const executeSellKit = (
    checkerAdress: string,
    amount: number,
    minAmount: number,
    deadLine: Date,
  ) => {
    const payload: CfmmOpeRowState = createCfmmOpeSubmitPayload(
      checkerAdress,
      CfmmOpeName.sell_kit,
      {
        amount: TzFormatTzToMutez(amount).toNumber(),
        minAmount,
        deadLine,
      },
    )

    dispatch(cfmmOpeActions.sellKitSubmit(payload))
    callBack()
  }

  return {
    sellKit: (checkerAdress: string, amount: number, minAmount: number, deadLine: Date) =>
      executeSellKit(checkerAdress, amount, minAmount, deadLine),
  }
}
