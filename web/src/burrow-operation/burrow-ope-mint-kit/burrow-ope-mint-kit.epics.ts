import { isPendingRequest } from '@shared/utils'
import { combineEpics, ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { createBurrowOpeConfirmEpic } from '../common/burrow-ope-common-confirm.epic'
import { BurrowOpeAction, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { burrowOpeHandleSubmitRequest } from '../state/burrow-ope-state.utils'
import { burrowOpeMintKitSubmitRequest } from './burrow-ope-mint-kit.api'

const actionType = 'burrowOpe/mintKitSubmit'

const submitDepositTez = (rowState: BurrowOpeRowState): Observable<BurrowOpeAction> =>
  burrowOpeHandleSubmitRequest(
    burrowOpeMintKitSubmitRequest(
      rowState.scAddress,
      rowState.burrowId,
      rowState.operationSubmitParams as number,
    ),
    'burrowOpe/mintKitSubmit',
    'burrowOpe/mintKitConfirm',
    rowState,
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
