import { isPendingRequest } from '@shared/utils'
import { combineEpics, ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { createBurrowOpeConfirmEpic } from '../common/burrow-ope-common-confirm.epic'
import { BurrowOpeAction, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { burrowOpeHandleSubmitRequest } from '../state/burrow-ope-state.utils'
import {
  BurrowOpeCreateBurrowSubmitParams,
  burrowOpeCreateBurrowSubmitRequest,
} from './burrow-ope-create-burrow.api'

const actionType = 'burrowOpe/createBurrowSubmit'

const submitCreateBurrow = (rowState: BurrowOpeRowState): Observable<BurrowOpeAction> =>
  burrowOpeHandleSubmitRequest(
    burrowOpeCreateBurrowSubmitRequest(
      rowState.burrowId,
      rowState.scAddress,
      rowState.operationSubmitParams as BurrowOpeCreateBurrowSubmitParams,
    ),
    'burrowOpe/createBurrowSubmit',
    'burrowOpe/createBurrowConfirm',
    rowState,
  )

const burrowOpeCreateBurrowSubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: BurrowOpeAction) => x.payload),
    filter((x: BurrowOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: BurrowOpeRowState) => submitCreateBurrow(x)),
  )

export const burrowOpeCreateBurrowConfirmEpic = createBurrowOpeConfirmEpic(
  'burrowOpe/createBurrowConfirm',
)

export const burrowOpeCreateBurrowEpics = combineEpics(
  burrowOpeCreateBurrowSubmitEpic,
  burrowOpeCreateBurrowConfirmEpic,
)
