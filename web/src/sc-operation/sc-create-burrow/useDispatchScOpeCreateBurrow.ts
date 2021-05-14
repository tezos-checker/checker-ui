import { RequestStatus, ScOperationStep, useAppDispatch } from '@config'
import { ScOperationRowState, ScWalletOperation } from '../state/sc-ope-state.type'
import { scOpeActions } from '../state/sc-ope.slice'
import { ScOpeCreateBurrowSubmitParams } from './sc-ope-create-burrow.api'

export const useDispatchCreateBurrow = (callBack: () => void) => {
  const dispatch = useAppDispatch()

  const exeCreateBurrow = (
    burrowId: number,
    scAddress: string,
    submitOperationParams: ScOpeCreateBurrowSubmitParams,
  ) => {
    const payload: ScOperationRowState = {
      burrowId,
      scAddress,
      operationId: `${Math.floor(Math.random() * 99)}_${new Date().getTime()}`,
      operationName: ScWalletOperation.create_burrow,
      operationStep: ScOperationStep.submit,
      status: RequestStatus.pending,
      errorMsg: '',
      submitOperationParams,
      nbConfirmation: 1,
      transactionWalletOperation: null,
      blockResponse: null,
    }

    dispatch(scOpeActions.createBurrowSubmit(payload))
    callBack()
  }
  return {
    createBurrow: (
      burrowId: number,
      scAddress: string,
      burrowParams: ScOpeCreateBurrowSubmitParams,
    ) => () => exeCreateBurrow(burrowId, scAddress, burrowParams),
  }
}
