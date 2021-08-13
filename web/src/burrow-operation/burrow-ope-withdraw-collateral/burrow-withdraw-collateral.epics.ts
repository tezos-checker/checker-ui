import { isPendingRequest } from '@shared/utils'
import { combineEpics, ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { createBurrowOpeConfirmEpic } from '../common/burrow-ope-common-confirm.epic'
import { BurrowOpeAction, BurrowOpeRowState } from '../state/burrow-ope-state.type'
import { burrowOpeHandleSubmitRequest } from '../state/burrow-ope-state.utils'
import { burrowOpeWithdrawCollateralSubmitRequest } from './burrow-ope-withdraw-collateral.api'

const actionType = 'burrowOpe/WithdrawCollateralSubmit'

const submitWithdrawCollateral = (rowState: BurrowOpeRowState): Observable<BurrowOpeAction> =>
  burrowOpeHandleSubmitRequest(
    burrowOpeWithdrawCollateralSubmitRequest(
      rowState.scAddress,
      rowState.burrowId,
      rowState.operationSubmitParams as number,
    ),
    'burrowOpe/WithdrawCollateralSubmit',
    'burrowOpe/WithdrawCollateralConfirm',
    rowState,
  )

const burrowOpeWithdrawCollateralSubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: BurrowOpeAction) => x.payload),
    filter((x: BurrowOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: BurrowOpeRowState) => submitWithdrawCollateral(x)),
  )

// epic factory in order an epic based on the action type
const burrowOpeWithdrawCollateralConfirmEpic = createBurrowOpeConfirmEpic(
  'burrowOpe/WithdrawCollateralConfirm',
)

export const burrowOpeWithdrawCollateralEpics = combineEpics(
  burrowOpeWithdrawCollateralSubmitEpic,
  burrowOpeWithdrawCollateralConfirmEpic,
)
