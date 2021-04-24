import { RequestStatus } from '@api'
import { TransactionWalletOperation } from '@taquito/taquito'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { OpIncrementExecute, OpIncrementWaitConfirmation } from '../../../api/op-increment.api'
import {
  IncrementConfirmationOpParams,
  IncrementTransfertOpParams,
  ScOperation,
  ScOperationStatus,
} from '../sc-operation-state.type'

const getAction = (payload: ScOperation): any => ({
  type: 'operation/increment',
  payload,
})

const increment = (payload: ScOperation): Observable<ScOperation> => {
  const { value, nbConfirmation } = payload.operationParams as IncrementTransfertOpParams
  debugger // eslint-disable-line no-debugger
  return from(OpIncrementExecute(value)).pipe(
    map((operation: TransactionWalletOperation) => {
      const operationParams: IncrementConfirmationOpParams = {
        operation,
        nbConfirmation,
      }
      return getAction({
        ...payload,
        operationParams,
        operationStatus: ScOperationStatus.confirme,
      })
    }),
    catchError((err) =>
      of(getAction({ ...payload, status: RequestStatus.error, errorMsg: err.message })),
    ),
  )
}

const waitConfirmation = (payload: ScOperation) => {
  const { operation, nbConfirmation } = payload.operationParams as IncrementConfirmationOpParams
  return from(OpIncrementWaitConfirmation(operation, nbConfirmation)).pipe(
    map((res: string) =>
      getAction({
        ...payload,
        status: RequestStatus.success,
        operationStatus: ScOperationStatus.confirmed,
        operationParams: res,
      }),
    ),
    catchError((err) => of(getAction({ ...payload, status: RequestStatus.error, errorMsg: err }))),
  )
}

const getMethodToCall = (payload: ScOperation) => {
  switch (payload.operationStatus) {
    case ScOperationStatus.transfert:
      return increment(payload)
    case ScOperationStatus.confirme:
      return waitConfirmation(payload)
    default:
      return of(getAction({ ...payload, status: RequestStatus.error, errorMsg: 'internal' }))
  }
}

const isRequestOnPending = (status: RequestStatus) => status === RequestStatus.pending

export const opIncrementEpic = (action$: any) =>
  action$.pipe(
    ofType('operation/increment'),
    map((x: any) => x.payload),
    filter((x: ScOperation) => isRequestOnPending(x.status)),
    mergeMap((x: ScOperation) => getMethodToCall(x)),
  )
