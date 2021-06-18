import { isPendingRequest } from '@shared/utils'
import { combineEpics, ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { createCfmmOpeConfirmEpic } from '../common/cfmm-ope-common-confirm.epic'
import { CfmmOpeAction, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { cfmmOpeHandleSubmitRequest } from '../state/cfmm-ope-state.utils'
import {
  CfmmOpeRemoveLiquiditySubmitParams,
  cfmmOpeRemoveLiquiditySubmitRequest
} from './cfmm-ope-remove-liquidity.api'

const actionType = 'cfmmOpe/removeLiquiditySubmit'

const submitRemoveLiquidity = (rowState: CfmmOpeRowState): Observable<CfmmOpeAction> => {
  const {
    kit,
    minTez,
    minKit,
    deadLine,
  } = rowState.operationSubmitParams as CfmmOpeRemoveLiquiditySubmitParams

  return cfmmOpeHandleSubmitRequest(
    cfmmOpeRemoveLiquiditySubmitRequest(rowState.scAddress, kit, minTez, minKit, deadLine),
    'cfmmOpe/removeLiquiditySubmit',
    'cfmmOpe/removeLiquidityConfirm',
    rowState,
  )
}

const cfmmOpeRemoveLiquiditySubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: CfmmOpeAction) => x.payload),
    filter((x: CfmmOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: CfmmOpeRowState) => submitRemoveLiquidity(x)),
  )

// epic factory in order an epic based on the action type
const cfmmOpeRemoveLiquidityConfirmEpic = createCfmmOpeConfirmEpic('cfmmOpe/removeLiquidityConfirm')

export const cfmmOpeRemoveLiquidityEpics = combineEpics(
  cfmmOpeRemoveLiquiditySubmitEpic,
  cfmmOpeRemoveLiquidityConfirmEpic,
)
