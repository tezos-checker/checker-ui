import { useAppDispatch } from '@config'
import { TzFormatTzToMutez } from '@shared/utils'
import { CfmmOpeName, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { createCfmmOpeSubmitPayload } from '../state/cfmm-ope-state.utils'
import { cfmmOpeActions } from '../state/cfmm-ope.slice'

export const useDispatchCfmmOpeBuyKit = (callBack: () => void) => {
  const dispatch = useAppDispatch()

  const executeBuyKit = (
    checkerAdress: string,
    amount: number,
    minAmount: number,
    deadLine: Date,
  ) => {
    const payload: CfmmOpeRowState = createCfmmOpeSubmitPayload(
      checkerAdress,
      CfmmOpeName.buy_kit,
      {
        amount: TzFormatTzToMutez(amount).toNumber(),
        minAmount,
        deadLine,
      },
    )

    dispatch(cfmmOpeActions.buyKitSubmit(payload))
    callBack()
  }

  return {
    buyKit: (checkerAdress: string, amount: number, minAmount: number, deadLine: Date) =>
      executeBuyKit(checkerAdress, amount, minAmount, deadLine),
  }
}
