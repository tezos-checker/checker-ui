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
import {
  BurrowOpeCreateBurrowSubmitParams,
  burrowOpeCreateBurrowSubmitRequest,
} from './burrow-ope-create-burrow.api'

const actionType = 'burrowOpe/createBurrowSubmit'

const submitCreateBurrow = (rowState: BurrowOpeRowState): Observable<BurrowOpeAction> =>
  from(
    burrowOpeCreateBurrowSubmitRequest(
      rowState.burrowId,
      rowState.scAddress,
      rowState.operationSubmitParams as BurrowOpeCreateBurrowSubmitParams,
    ),
  ).pipe(
    map((res: TransactionWalletOperation) =>
      createBurrowOpeConfirmAction(actionType, res, 'burrowOpe/createBurrowConfirm', rowState),
    ),

    catchError((err) => of(createBurrowOpeErrorAction(actionType, rowState, err.message))),
  )

const burrowOpeCreateBurrowSubmitRequestEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: BurrowOpeAction) => x.payload),
    filter((x: BurrowOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: BurrowOpeRowState) => submitCreateBurrow(x)),
  )

export const scOpeCreateBurrowConfirmEpic = createBurrowOpeConfirmEpic(
  'burrowOpe/createBurrowConfirm',
)

export const burrowOpeCreateBurrowEpics = combineEpics(
  burrowOpeCreateBurrowSubmitRequestEpic,
  scOpeCreateBurrowConfirmEpic,
)
