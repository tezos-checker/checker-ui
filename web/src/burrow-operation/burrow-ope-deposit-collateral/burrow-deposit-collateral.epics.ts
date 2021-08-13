import { isPendingRequest } from '@shared/utils'
import { combineEpics, ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { createBurrowOpeConfirmEpic } from '../common/burrow-ope-common-confirm.epic'
import { BurrowOpeAction, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { burrowOpeHandleSubmitRequest } from '../state/burrow-ope-state.utils'
import { burrowOpeDepositCollateralSubmitRequest } from './burrow-ope-deposit-collateral.api'

const actionType = 'burrowOpe/DepositCollateralSubmit'

const submitDepositCollateral = (rowState: BurrowOpeRowState): Observable<BurrowOpeAction> =>
  burrowOpeHandleSubmitRequest(
    burrowOpeDepositCollateralSubmitRequest(
      rowState.scAddress,
      rowState.burrowId,
      rowState.operationSubmitParams as number,
    ),
    'burrowOpe/DepositCollateralSubmit',
    'burrowOpe/DepositCollateralConfirm',
    rowState,
  )

const burrowOpeDepositCollateralSubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: BurrowOpeAction) => x.payload),
    filter((x: BurrowOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: BurrowOpeRowState) => submitDepositCollateral(x)),
  )

// epic factory in order an epic based on the action type
const burrowOpeDepositCollateralConfirmEpic = createBurrowOpeConfirmEpic(
  'burrowOpe/DepositCollateralConfirm',
)

export const burrowOpeDepositCollateralEpics = combineEpics(
  burrowOpeDepositCollateralSubmitEpic,
  burrowOpeDepositCollateralConfirmEpic,
)
