import { RequestStatus, ScOperationStep, useAppDispatch } from '@config'
import { ScOperationRowState, ScWalletOperation } from '../state/sc-ope-state.type'
import { scOpeActions } from '../state/sc-ope.slice'
import { ScOpeDepositTezSubmitParams } from './sc-ope-deposit-tez.api'

export const useDispatchDepositTez = (burrowId: string, tez: number, callBack: () => void) => {
  const dispatch = useAppDispatch()
  const submitOperationParams: ScOpeDepositTezSubmitParams = { tez }

  const payload: ScOperationRowState = {
    burrowId,
    operationId: `${Math.floor(Math.random() * 99)}_${new Date().getTime()}`,
    operationName: ScWalletOperation.deposit_tez,
    operationStep: ScOperationStep.submit,
    status: RequestStatus.pending,
    errorMsg: '',
    submitOperationParams,
    nbConfirmation: 1,
    transactionWalletOperation: null,
    blockResponse: null,
  }

  return () => {
    dispatch(scOpeActions.depositTezSubmit(payload))
    callBack()
  }
}
