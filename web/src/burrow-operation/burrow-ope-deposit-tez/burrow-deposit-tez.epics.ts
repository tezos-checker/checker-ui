import { ScOperationStep } from '@config'
import { isPendingRequest } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'
import { combineEpics, ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { createConfirmMethodForAction } from '../config/burrow-ope-common-confirm.epic'
import { BurrowOpeAction, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { createOperationErrorAction } from '../state/burrow-ope-state.utils'
import {
  burrowOpeDepositTezSubmit,
  BurrowOpeDepositTezSubmitParams,
} from './burrow-ope-deposit-tez.api'

const actionType = 'burrowOpe/depositTezSubmit'

const submitDepositTez = (rowState: BurrowOpeRowState): Observable<BurrowOpeAction> =>
  from(
    burrowOpeDepositTezSubmit(
      rowState.scAddress,
      rowState.submitOperationParams as BurrowOpeDepositTezSubmitParams,
    ),
  ).pipe(
    map((res: TransactionWalletOperation) => {
      if (res) {
        // eslint-disable-next-line
        return {
          type: 'burrowOpe/depositTezConfirm',
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

const burrowOpeDepositTezSubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: BurrowOpeAction) => x.payload),
    filter((x: BurrowOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: BurrowOpeRowState) => submitDepositTez(x)),
  )

const scOpeDepositTezConfirmEpic = createConfirmMethodForAction('burrowOpe/depositTezConfirm')

export const burrowOpeDepositTezEpics = combineEpics(
  burrowOpeDepositTezSubmitEpic,
  scOpeDepositTezConfirmEpic,
)