import { AbstractAction, OperationStep, RequestStatus } from '@config'
import { TransactionWalletOperation, WalletOperation } from '@taquito/taquito'
import { from, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import {
  CfmmOpeAction,
  CfmmOpeName,
  CfmmOpeRowState,
  CfmmOpeSubmitParams,
} from './cfmm-ope-state.type'

export const createCfmmOpeErrorAction = (
  actionType: string,
  rowState: CfmmOpeRowState,
  errorMsg: string,
): AbstractAction<CfmmOpeRowState> => ({
  type: actionType,
  payload: {
    ...rowState,
    status: RequestStatus.error,
    errorMsg,
  },
})

export const createCfmmOpeSubmitPayload = (
  scAddress: string,
  operationName: CfmmOpeName,
  operationSubmitParams: CfmmOpeSubmitParams,
): CfmmOpeRowState => ({
  id: new Date().getTime(),
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

export const cfmmOpeHandleSubmitRequest = (
  request: Promise<TransactionWalletOperation | WalletOperation>,
  submitActionType: string,
  confirmActionType: string,
  cfmmOpeRowState: CfmmOpeRowState,
): Observable<CfmmOpeAction> =>
  from(request).pipe(
    map((res: TransactionWalletOperation | WalletOperation) => {
      if (res) {
        // eslint-disable-next-line
        return {
          type: confirmActionType,
          payload: {
            ...cfmmOpeRowState,
            operationStep: OperationStep.confirm,
            transactionWalletOperation: {
              confirmOperation: (nbConfirmation: number) => res.confirmation(nbConfirmation),
            },
          },
        }
      }
      return createCfmmOpeErrorAction(submitActionType, cfmmOpeRowState, 'Internal error')
    }),
    catchError((err) =>
      of(createCfmmOpeErrorAction(submitActionType, cfmmOpeRowState, err.message)),
    ),
  )
