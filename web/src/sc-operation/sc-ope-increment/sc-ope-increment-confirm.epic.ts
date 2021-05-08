import { RequestStatus, ScOperationStep } from '@config'
import { isPendingRequest } from '@shared/utils'
import { BlockResponse } from '@taquito/rpc'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { scOpeConfirmation } from '../config/sc-ope-common.api'
import { ScOperationAction, ScOperationRowState } from '../state/sc-ope-state.type'
import { createOperationErrorAction } from '../state/sc-ope-state.utils'

const actionType = 'operation/incrementConfirm'

const confirmIncrement = (rowState: ScOperationRowState): Observable<ScOperationAction> => {
  if (!rowState.transactionWalletOperation) {
    return of(createOperationErrorAction(actionType, rowState, 'Internal error'))
  }

  return from(scOpeConfirmation(rowState.transactionWalletOperation)).pipe(
    map((blockResponse: BlockResponse) => {
      if (blockResponse) {
        // eslint-disable-next-line
        return {
          type: actionType,
          payload: {
            ...rowState,
            operationStep: ScOperationStep.confirmed,
            status: RequestStatus.success,
            blockResponse,
          },
        }
      }
      return createOperationErrorAction(actionType, rowState, 'Internal error')
    }),
    catchError((err) => of(createOperationErrorAction(actionType, rowState, err.message))),
  )
}

export const scOpeIncrementConfirmEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: ScOperationAction) => x.payload),
    filter((x: ScOperationRowState) => isPendingRequest(x.status)),
    mergeMap((x: ScOperationRowState) => confirmIncrement(x)),
  )
