import { ScOperationStep } from '@config'
import { isPendingRequest } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'
import { ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { ScOperationAction, ScOperationRowState } from '../state/sc-ope-state.type'
import { createOperationErrorAction } from '../state/sc-ope-state.utils'
import { scOpeIncrementSubmit } from './sc-ope-increment.api'

const actionType = 'operation/incrementSubmit'

const submitIncrement = (rowState: ScOperationRowState): Observable<ScOperationAction> =>
  from(scOpeIncrementSubmit(rowState.submitOperationParams)).pipe(
    map((res: TransactionWalletOperation) => {
      if (res) {
        // eslint-disable-next-line
        return {
          type: 'operation/incrementConfirm',
          payload: {
            ...rowState,
            operationStep: ScOperationStep.confirm,
            transactionWalletOperation: res,
          },
        }
      }
      return createOperationErrorAction(actionType, rowState, 'Internal error')
    }),
    catchError((err) => of(createOperationErrorAction(actionType, rowState, err.message))),
  )

export const scOpeIncrementSubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: ScOperationAction) => x.payload),
    filter((x: ScOperationRowState) => isPendingRequest(x.status)),
    mergeMap((x: ScOperationRowState) => submitIncrement(x)),
  )