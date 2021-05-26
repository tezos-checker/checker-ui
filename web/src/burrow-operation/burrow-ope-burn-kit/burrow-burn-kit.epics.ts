import { isPendingRequest } from '@shared/utils'
import { combineEpics, ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { createBurrowOpeConfirmEpic } from '../common/burrow-ope-common-confirm.epic'
import { BurrowOpeAction, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { burrowOpeHandleSubmitRequest } from '../state/burrow-ope-state.utils'
import { burrowOpeBurnKitSubmitRequest } from './burrow-ope-burn-kit.api'

const actionType = 'burrowOpe/burnKitSubmit'

const submitBurnKit = (rowState: BurrowOpeRowState): Observable<BurrowOpeAction> =>
  burrowOpeHandleSubmitRequest(
    burrowOpeBurnKitSubmitRequest(
      rowState.scAddress,
      rowState.burrowId,
      rowState.operationSubmitParams as number,
    ),
    'burrowOpe/burnKitSubmit',
    'burrowOpe/burnKitConfirm',
    rowState,
  )

const burrowOpeBurnKitSubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: BurrowOpeAction) => x.payload),
    filter((x: BurrowOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: BurrowOpeRowState) => submitBurnKit(x)),
  )

// epic factory in order an epic based on the action type
const burrowOpeBurnKitConfirmEpic = createBurrowOpeConfirmEpic('burrowOpe/burnKitConfirm')

export const burrowOpeBurnKitEpics = combineEpics(
  burrowOpeBurnKitSubmitEpic,
  burrowOpeBurnKitConfirmEpic,
)
