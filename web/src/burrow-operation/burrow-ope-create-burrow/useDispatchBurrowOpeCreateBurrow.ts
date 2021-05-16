import { RequestStatus, ScOperationStep, useAppDispatch } from '@config'
import { BurrowOpeEnum, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { burrowOpeActions } from '../state/burrow-ope.slice'
import { BurrowOpeCreateBurrowSubmitParams } from './burrow-ope-create-burrow.api'

export const useDispatchBurrowOpeCreateBurrow = (callBack: () => void) => {
  const dispatch = useAppDispatch()

  const exeCreateBurrow = (
    burrowId: number,
    scAddress: string,
    submitOperationParams: BurrowOpeCreateBurrowSubmitParams,
  ) => {
    const payload: BurrowOpeRowState = {
      burrowId,
      scAddress,
      operationName: BurrowOpeEnum.create_burrow,
      operationStep: ScOperationStep.submit,
      status: RequestStatus.pending,
      errorMsg: '',
      submitOperationParams,
      nbConfirmation: 1,
      transactionWalletOperation: null,
      blockResponse: null,
    }

    dispatch(burrowOpeActions.createBurrowSubmit(payload))
    callBack()
  }
  return {
    createBurrow: (
      burrowId: number,
      scAddress: string,
      burrowParams: BurrowOpeCreateBurrowSubmitParams,
    ) => exeCreateBurrow(burrowId, scAddress, burrowParams),
  }
}
