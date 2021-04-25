import { RequestStatus } from '@api'
import { useAppDispatch } from '@config'
import { ScOpeEntryPoint, ScOpeStep } from '../sc-ope-state.type'
import { scOpeActions } from '../sc-ope.slice'
import { OpeParams_Increment_Transfert } from './sc-ope-increment.type'

export const dispatchScIncrement = (value: number, amount: number, nbConfirmation: number) => {
  const dispatch = useAppDispatch()
  const opeParams: OpeParams_Increment_Transfert = {
    value,
    nbConfirmation,
  }

  return () =>
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
}
