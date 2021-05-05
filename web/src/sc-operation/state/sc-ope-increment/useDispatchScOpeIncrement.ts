import { RequestStatus } from '@api'
import { useAppDispatch } from '@config'
import { ScOpeEntryPoint, ScOpeStep } from '../sc-ope-state.type'
import { scOpeActions } from '../sc-ope.slice'
import { ScOpeParamsIncrementTransfert } from './sc-ope-increment.type'

export const useDispatchScIncrement = (
  value: number,
  amount: number,
  nbConfirmation: number,
  callBack: () => void,
) => {
  const dispatch = useAppDispatch()
  const opeParams: ScOpeParamsIncrementTransfert = {
    value,
    nbConfirmation,
  }

  return () => {
    dispatch(
      scOpeActions.increment({
        id: `${Math.floor(Math.random() * 99)}_${new Date().getTime()}`,
        opeEntryPoint: ScOpeEntryPoint.increment,
        opeStep: ScOpeStep.transfert,
        status: RequestStatus.pending,
        errorMsg: '',
        opeParams,
        amount,
      }),
    )
    callBack()
  }
}
