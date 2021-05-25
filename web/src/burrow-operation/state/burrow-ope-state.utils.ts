import { AbstractAction, BurrowOpeStep, RequestStatus } from '@config'
import { TransactionWalletOperation } from '@taquito/taquito'
import { BurrowOpeName, BurrowOpeRowState, BurrowOpeSubmitParams } from './burrow-ope-state.type'

export const createBurrowOpeErrorAction = (
  actionType: string,
  rowState: BurrowOpeRowState,
  errorMsg: string,
): AbstractAction<BurrowOpeRowState> => ({
  type: actionType,
  payload: {
    ...rowState,
    status: RequestStatus.error,
    errorMsg,
  },
})

export const createBurrowOpeSubmitPayload = (
  burrowId: number,
  scAddress: string,
  operationName: BurrowOpeName,
  operationSubmitParams: BurrowOpeSubmitParams,
): BurrowOpeRowState => ({
  burrowId,
  scAddress,
  operationName,
  operationStep: BurrowOpeStep.submit,
  status: RequestStatus.pending,
  errorMsg: '',
  operationSubmitParams,
  nbConfirmation: 1,
  transactionWalletOperation: null,
  blockResponse: null,
})

export const createBurrowOpeConfirmAction = (
  burrowOpeSubmitActionType: string,
  burrowOpeSubmitRes: TransactionWalletOperation,
  burrowOpeConfirmActionType: string,
  burrowOpeRowState: BurrowOpeRowState,
): AbstractAction<BurrowOpeRowState> => {
  if (burrowOpeSubmitRes) {
    // eslint-disable-next-line
    return {
      type: burrowOpeConfirmActionType,
      payload: {
        ...burrowOpeRowState,
        operationStep: BurrowOpeStep.confirm,
        transactionWalletOperation: {
          confirmOperation: (nbConfirmation: number) =>
            burrowOpeSubmitRes.confirmation(nbConfirmation),
        },
      },
    }
  }
  return createBurrowOpeErrorAction(burrowOpeSubmitActionType, burrowOpeRowState, 'Internal error')
}
