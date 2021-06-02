import { AbstractAction, OperationStep, RequestStatus } from '@config'
import { TransactionWalletOperation } from '@taquito/taquito'
import { from, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import {
  BurrowOpeAction,
  BurrowOpeName,
  BurrowOpeRowState,
  BurrowOpeSubmitParams,
} from './burrow-ope-state.type'

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
  operationStep: OperationStep.submit,
  status: RequestStatus.pending,
  errorMsg: '',
  operationSubmitParams,
  nbConfirmation: 1,
  transactionWalletOperation: null,
  blockResponse: null,
})

export const burrowOpeHandleSubmitRequest = (
  request: Promise<TransactionWalletOperation>,
  submitActionType: string,
  confirmActionType: string,
  burrowOpeRowState: BurrowOpeRowState,
): Observable<BurrowOpeAction> =>
  from(request).pipe(
    map((res: TransactionWalletOperation) => {
      if (res) {
        // eslint-disable-next-line
        return {
          type: confirmActionType,
          payload: {
            ...burrowOpeRowState,
            operationStep: OperationStep.confirm,
            transactionWalletOperation: {
              confirmOperation: (nbConfirmation: number) => res.confirmation(nbConfirmation),
            },
          },
        }
      }
      return createBurrowOpeErrorAction(submitActionType, burrowOpeRowState, 'Internal error')
    }),
    catchError((err) =>
      of(createBurrowOpeErrorAction(submitActionType, burrowOpeRowState, err.message)),
    ),
  )
