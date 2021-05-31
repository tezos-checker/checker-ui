import { isPendingRequest } from '@shared/utils'
import { combineEpics, ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { createBurrowOpeConfirmEpic } from '../common/burrow-ope-common-confirm.epic'
import { BurrowOpeAction, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { burrowOpeHandleSubmitRequest } from '../state/burrow-ope-state.utils'
import { BurrowOpeBuyKitSubmitParams, burrowOpeBuyKitSubmitRequest } from './burrow-ope-buy-kit.api'

const actionType = 'burrowOpe/buyKitSubmit'

const submitBuyKit = (rowState: BurrowOpeRowState): Observable<BurrowOpeAction> => {
  const {
    amount,
    minAmount,
    deadLine,
  } = rowState.operationSubmitParams as BurrowOpeBuyKitSubmitParams

  return burrowOpeHandleSubmitRequest(
    burrowOpeBuyKitSubmitRequest(rowState.scAddress, amount, minAmount, deadLine),
    'burrowOpe/buyKitSubmit',
    'burrowOpe/buyKitConfirm',
    rowState,
  )
}

const burrowOpeBuyKitSubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: BurrowOpeAction) => x.payload),
    filter((x: BurrowOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: BurrowOpeRowState) => submitBuyKit(x)),
  )

// epic factory in order an epic based on the action type
const burrowOpeBuyKitConfirmEpic = createBurrowOpeConfirmEpic('burrowOpe/buyKitConfirm')

export const burrowOpeBuyKitEpics = combineEpics(
  burrowOpeBuyKitSubmitEpic,
  burrowOpeBuyKitConfirmEpic,
)
