import { RequestStatus } from '@api'
import { isPendingRequest } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import {
  scOpeIncrementConfirmation,
  scOpeIncrementTransfert,
} from '../../../api/sc-ope-increment.api'
import { ScOpeAction, ScOpePayload, ScOpeStep } from '../sc-ope-state.type'
import {
  ScOpeParamsIncrementConfirmation,
  ScOpeParamsIncrementTransfert,
} from './sc-ope-increment.type'

const getAction = (payload: ScOpePayload): any => ({
  type: 'operation/increment',
  payload,
})

// step 1 - execute transfert
const exeOpeIncrementTransfert = (payload: ScOpePayload): Observable<ScOpePayload> => {
  const { value, nbConfirmation } = payload.opeParams as ScOpeParamsIncrementTransfert

  return from(scOpeIncrementTransfert(value)).pipe(
    map((operation: TransactionWalletOperation) => {
      const opeParams: ScOpeParamsIncrementConfirmation = {
        operation,
        nbConfirmation,
      }
      return getAction({
        ...payload,
        opeParams,
        // will execute the step 2 - confirmation
        opeStep: ScOpeStep.confirme,
      })
    }),
    catchError((err) =>
      of(getAction({ ...payload, status: RequestStatus.error, errorMsg: err.message })),
    ),
  )
}

// step 2 - wait the transfert confirmation
const exeOpeIncrementConfimation = (payload: ScOpePayload) => {
  const { operation, nbConfirmation } = payload.opeParams as ScOpeParamsIncrementConfirmation
  return from(scOpeIncrementConfirmation(operation, nbConfirmation)).pipe(
    map((res: string) =>
      getAction({
        ...payload,
        status: RequestStatus.success,
        opeStep: ScOpeStep.confirmed,
        opeParams: res,
      }),
    ),
    catchError((err) => of(getAction({ ...payload, status: RequestStatus.error, errorMsg: err }))),
  )
}

// We call a specific 'api' depending of the payload.opeStep value
const getMethodToCall = (payload: ScOpePayload) => {
  switch (payload.opeStep) {
    case ScOpeStep.transfert:
      return exeOpeIncrementTransfert(payload)
    case ScOpeStep.confirme:
      return exeOpeIncrementConfimation(payload)
    default:
      return of(getAction({ ...payload, status: RequestStatus.error, errorMsg: 'internal' }))
  }
}

export const scOpeIncrementEpic = (action$: any) =>
  action$.pipe(
    ofType('operation/increment'),
    map((x: ScOpeAction) => x.payload),
    filter((x: ScOpePayload) => isPendingRequest(x.status)),
    mergeMap((x: ScOpePayload) => getMethodToCall(x)),
  )
