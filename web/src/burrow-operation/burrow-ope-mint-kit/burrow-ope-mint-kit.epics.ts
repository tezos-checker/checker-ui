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
import { burrowOpeMintKitSubmitRequest } from './burrow-ope-mint-kit.api'

const actionType = 'burrowOpe/mintKitSubmit'

const submitDepositTez = (rowState: BurrowOpeRowState): Observable<BurrowOpeAction> =>
  from(
    burrowOpeMintKitSubmitRequest(
      rowState.scAddress,
      rowState.burrowId,
      rowState.operationSubmitParams as number,
    ),
  ).pipe(
    map((res: TransactionWalletOperation) =>
      createBurrowOpeConfirmAction(actionType, res, 'burrowOpe/mintKitConfirm', rowState),
    ),
    catchError((err) => of(createBurrowOpeErrorAction(actionType, rowState, err.message))),
  )

const burrowOpeMintKitSubmitRequestEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: BurrowOpeAction) => x.payload),
    filter((x: BurrowOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: BurrowOpeRowState) => submitDepositTez(x)),
  )

const burrowOpeMintKitConfirmRequestEpic = createBurrowOpeConfirmEpic('burrowOpe/mintKitConfirm')

export const burrowOpeMintKitEpics = combineEpics(
  burrowOpeMintKitSubmitRequestEpic,
  burrowOpeMintKitConfirmRequestEpic,
)
