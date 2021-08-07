import { isPendingRequest } from '@shared/utils'
import { combineEpics, ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { createCfmmOpeConfirmEpic } from '../common/cfmm-ope-common-confirm.epic'
import { CfmmOpeAction, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { cfmmOpeHandleSubmitRequest } from '../state/cfmm-ope-state.utils'
import {
  CfmmOpeAddLiquiditySubmitParams,
  cfmmOpeAddLiquiditySubmitRequest,
} from './cfmm-ope-add-liquidity.api'

const actionType = 'cfmmOpe/addLiquiditySubmit'

const submitAddLiquidity = (rowState: CfmmOpeRowState): Observable<CfmmOpeAction> => {
  const {
    amount,
    maxExpected,
    minToken,
    deadLine,
  } = rowState.operationSubmitParams as CfmmOpeAddLiquiditySubmitParams

  return cfmmOpeHandleSubmitRequest(
    cfmmOpeAddLiquiditySubmitRequest(rowState.scAddress, amount, maxExpected, minToken, deadLine),
    'cfmmOpe/addLiquiditySubmit',
    'cfmmOpe/addLiquidityConfirm',
    rowState,
  )
}

const cfmmOpeAddLiquiditySubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: CfmmOpeAction) => x.payload),
    filter((x: CfmmOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: CfmmOpeRowState) => submitAddLiquidity(x)),
  )

// epic factory in order an epic based on the action type
const cfmmOpeAddLiquidityConfirmEpic = createCfmmOpeConfirmEpic('cfmmOpe/addLiquidityConfirm')

export const cfmmOpeAddLiquidityEpics = combineEpics(
  cfmmOpeAddLiquiditySubmitEpic,
  cfmmOpeAddLiquidityConfirmEpic,
)
