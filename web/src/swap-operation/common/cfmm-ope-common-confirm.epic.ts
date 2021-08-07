import { OperationStep, RequestStatus } from '@config'
import { isPendingRequest } from '@shared/utils'
import { BlockResponse } from '@taquito/rpc'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { CfmmOpeAction } from '../state/cfmm-ope-state.type'
import { createCfmmOpeErrorAction } from '../state/cfmm-ope-state.utils'
import { cfmmOpeConfirmRequest } from './cfmm-ope-common.api'

const confirmMethod = ({ type, payload }: CfmmOpeAction): Observable<CfmmOpeAction> => {
  if (!payload.transactionWalletOperation) {
    return of(createCfmmOpeErrorAction(type, payload, 'Internal error'))
  }

  return from(cfmmOpeConfirmRequest(payload.transactionWalletOperation)).pipe(
    map((blockResponse: BlockResponse) => {
      if (blockResponse) {
        // eslint-disable-next-line
        return {
          type,
          payload: {
            ...payload,
            operationStep: OperationStep.confirmed,
            status: RequestStatus.success,
            blockResponse,
          },
        }
      }
      return createCfmmOpeErrorAction(type, payload, 'Internal error')
    }),
    catchError((err) => of(createCfmmOpeErrorAction(type, payload, err.message))),
  )
}

export const createCfmmOpeConfirmEpic = (actionType: string) => (action$: any) =>
  action$.pipe(
    ofType(actionType),
    filter((x: CfmmOpeAction) => isPendingRequest(x.payload.status)),
    mergeMap((x: CfmmOpeAction) => confirmMethod(x)),
  )
