import { BurrowOpeStep, RequestStatus } from '@config'
import { isPendingRequest } from '@shared/utils'
import { BlockResponse } from '@taquito/rpc'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { BurrowOpeAction } from '../state/burrow-ope-state.type'
import { createBurrowOpeErrorAction } from '../state/burrow-ope-state.utils'
import { burrowOpeConfirmRequest } from './burrow-ope-common.api'

const confirmMethod = ({ type, payload }: BurrowOpeAction): Observable<BurrowOpeAction> => {
  if (!payload.transactionWalletOperation) {
    return of(createBurrowOpeErrorAction(type, payload, 'Internal error'))
  }

  return from(burrowOpeConfirmRequest(payload.transactionWalletOperation)).pipe(
    map((blockResponse: BlockResponse) => {
      if (blockResponse) {
        // eslint-disable-next-line
        return {
          type,
          payload: {
            ...payload,
            operationStep: BurrowOpeStep.confirmed,
            status: RequestStatus.success,
            blockResponse,
          },
        }
      }
      return createBurrowOpeErrorAction(type, payload, 'Internal error')
    }),
    catchError((err) => of(createBurrowOpeErrorAction(type, payload, err.message))),
  )
}

export const createBurrowOpeConfirmEpic = (actionType: string) => (action$: any) =>
  action$.pipe(
    ofType(actionType),
    filter((x: BurrowOpeAction) => isPendingRequest(x.payload.status)),
    mergeMap((x: BurrowOpeAction) => confirmMethod(x)),
  )
