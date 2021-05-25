import { isPendingRequest } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'
import { combineEpics, ofType } from 'redux-observable'
import { from, Observable, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { createBurrowOpeConfirmEpic } from '../common/burrow-ope-common-confirm.epic'
import { BurrowOpeAction, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import {
  createBurrowOpeConfirmAction,
  createBurrowOpeErrorAction,
} from '../state/burrow-ope-state.utils'
import { burrowOpeDepositTezSubmitRequest } from './burrow-ope-deposit-tez.api'

const actionType = 'burrowOpe/depositTezSubmit'

const submitDepositTez = (rowState: BurrowOpeRowState): Observable<BurrowOpeAction> =>
  from(
    burrowOpeDepositTezSubmitRequest(
      rowState.scAddress,
      rowState.burrowId,
      rowState.operationSubmitParams as number,
    ),
  ).pipe(
    map((res: TransactionWalletOperation) =>
      createBurrowOpeConfirmAction(actionType, res, 'burrowOpe/depositTezConfirm', rowState),
    ),
    catchError((err) => of(createBurrowOpeErrorAction(actionType, rowState, err.message))),
  )

const burrowOpeDepositTezSubmitRequestEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: BurrowOpeAction) => x.payload),
    filter((x: BurrowOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: BurrowOpeRowState) => submitDepositTez(x)),
  )

// epic factory in order an epic based on the action type
const scOpeDepositTezConfirmEpic = createBurrowOpeConfirmEpic('burrowOpe/depositTezConfirm')

export const burrowOpeDepositTezEpics = combineEpics(
  burrowOpeDepositTezSubmitRequestEpic,
  scOpeDepositTezConfirmEpic,
)
