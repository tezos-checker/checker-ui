import { RequestStatus, ScOperationStep, useAppDispatch } from '@config'
import {
  BurrowOpeAmountSubmitParams,
  BurrowOpeEnum,
  BurrowOpeRowState,
} from '../state/burrow-ope-state.type'
import { burrowOpeActions } from '../state/burrow-ope.slice'

export const useDispatchBurrowOpeMint = (
  burrowId: number,
  scAddress: string,
  callBack: () => void,
) => {
  const dispatch = useAppDispatch()

  const executeMint = (amount: number) => {
    const submitOperationParams: BurrowOpeAmountSubmitParams = { burrowId, amount }

    const payload: BurrowOpeRowState = {
      burrowId,
      scAddress,
      operationName: BurrowOpeEnum.mint_kit,
      operationStep: ScOperationStep.submit,
      status: RequestStatus.pending,
      errorMsg: '',
      submitOperationParams,
      nbConfirmation: 1,
      transactionWalletOperation: null,
      blockResponse: null,
    }
    dispatch(burrowOpeActions.mintKitSubmit(payload))
    callBack()
  }

  return {
    mint: (tez: number) => executeMint(tez),
  }
}
