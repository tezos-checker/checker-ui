import { RequestStatus, ScOperationStep, useAppDispatch } from '@config'
import { ScOperationRowState, ScWalletOperation } from '../state/sc-ope-state.type'
import { scOpeActions } from '../state/sc-ope.slice'
import { ScOperationIncrementSubmitParams } from './sc-ope-increment.api'

export const useDispatchScIncrement = (
  value: number,
  amount: number,
  nbConfirmation: number,
  callBack: () => void,
) => {
  const dispatch = useAppDispatch()
  const submitOperationParams: ScOperationIncrementSubmitParams = {
    value,
    amount,
  }

  const payload: ScOperationRowState = {
    id: `${Math.floor(Math.random() * 99)}_${new Date().getTime()}`,
    operationName: ScWalletOperation.increment,
    operationStep: ScOperationStep.submit,
    status: RequestStatus.pending,
    errorMsg: '',
    submitOperationParams,
    nbConfirmation,
    transactionWalletOperation: null,
    blockResponse: null,
  }

  return () => {
    dispatch(scOpeActions.incrementSubmit(payload))
    callBack()
  }
}
