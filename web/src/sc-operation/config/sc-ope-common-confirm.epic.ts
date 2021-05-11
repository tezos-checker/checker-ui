import { RequestStatus, ScOperationStep } from '@config'
import { isPendingRequest } from '@shared/utils'
import { BlockResponse } from '@taquito/rpc'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { ScOperationAction } from '../state/sc-ope-state.type'
import { createOperationErrorAction } from '../state/sc-ope-state.utils'
import { scOpeConfirmation } from './sc-ope-common.api'

const confirmMethod = ({ type, payload }: ScOperationAction): Observable<ScOperationAction> => {
  if (!payload.transactionWalletOperation) {
    return of(createOperationErrorAction(type, payload, 'Internal error'))
  }

  return from(scOpeConfirmation(payload.transactionWalletOperation)).pipe(
    map((blockResponse: BlockResponse) => {
      if (blockResponse) {
        // eslint-disable-next-line
        return {
          type,
          payload: {
            ...payload,
            operationStep: ScOperationStep.confirmed,
            status: RequestStatus.success,
            blockResponse,
          },
        }
      }
      return createOperationErrorAction(type, payload, 'Internal error')
    }),
    catchError((err) => of(createOperationErrorAction(type, payload, err.message))),
  )
}

export const createConfirmMethodForAction = (actionType: string) => (action$: any) =>
  action$.pipe(
    ofType(actionType),
    filter((x: ScOperationAction) => isPendingRequest(x.payload.status)),
    mergeMap((x: ScOperationAction) => confirmMethod(x)),
  )
