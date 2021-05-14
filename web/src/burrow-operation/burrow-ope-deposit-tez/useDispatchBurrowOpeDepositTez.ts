import { RequestStatus, ScOperationStep, useAppDispatch } from '@config'
import { BurrowOpeEnum, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { burrowOpeActions } from '../state/burrow-ope.slice'
import { BurrowOpeDepositTezSubmitParams } from './burrow-ope-deposit-tez.api'

export const useDispatchBurrowOpeDepositTez = (
  burrowId: number,
  scAddress: string,
  callBack: () => void,
) => {
  const dispatch = useAppDispatch()

  const executeDeposit = (tez: number) => {
    const submitOperationParams: BurrowOpeDepositTezSubmitParams = { tez }

    const payload: BurrowOpeRowState = {
      burrowId,
      scAddress,
      operationName: BurrowOpeEnum.deposit_tez,
      operationStep: ScOperationStep.submit,
      status: RequestStatus.pending,
      errorMsg: '',
      submitOperationParams,
      nbConfirmation: 1,
      transactionWalletOperation: null,
      blockResponse: null,
    }
    dispatch(burrowOpeActions.depositTezSubmit(payload))
    callBack()
  }

  return {
    depositTez: (tez: number) => () => executeDeposit(tez),
  }
}
