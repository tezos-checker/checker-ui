import { isPendingRequest } from '@shared/utils'
import { combineEpics, ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { createBurrowOpeConfirmEpic } from '../common/burrow-ope-common-confirm.epic'
import { BurrowOpeAction, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { burrowOpeHandleSubmitRequest } from '../state/burrow-ope-state.utils'
import { burrowOpeWithdrawTezSubmitRequest } from './burrow-ope-withdraw-tez.api'

const actionType = 'burrowOpe/withdrawTezSubmit'

const submitWithdrawTez = (rowState: BurrowOpeRowState): Observable<BurrowOpeAction> =>
  burrowOpeHandleSubmitRequest(
    burrowOpeWithdrawTezSubmitRequest(
      rowState.scAddress,
      rowState.burrowId,
      rowState.operationSubmitParams as number,
    ),
    'burrowOpe/withdrawTezSubmit',
    'burrowOpe/withdrawTezConfirm',
    rowState,
  )

const burrowOpeWithdrawTezSubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: BurrowOpeAction) => x.payload),
    filter((x: BurrowOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: BurrowOpeRowState) => submitWithdrawTez(x)),
  )

// epic factory in order an epic based on the action type
const burrowOpeWithdrawTezConfirmEpic = createBurrowOpeConfirmEpic('burrowOpe/withdrawTezConfirm')

export const burrowOpeWithdrawTezEpics = combineEpics(
  burrowOpeWithdrawTezSubmitEpic,
  burrowOpeWithdrawTezConfirmEpic,
)
