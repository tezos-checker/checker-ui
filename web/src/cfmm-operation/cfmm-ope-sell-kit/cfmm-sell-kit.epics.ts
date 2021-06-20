import { isPendingRequest } from '@shared/utils'
import { combineEpics, ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { createCfmmOpeConfirmEpic } from '../common/cfmm-ope-common-confirm.epic'
import { CfmmOpeAction, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { cfmmOpeHandleSubmitRequest } from '../state/cfmm-ope-state.utils'
import { CfmmOpeSellKitSubmitParams, cfmmOpeSellKitSubmitRequest } from './cfmm-ope-sell-kit.api'

const actionType = 'cfmmOpe/sellKitSubmit'

const submitSellKit = (rowState: CfmmOpeRowState): Observable<CfmmOpeAction> => {
  const {
    amount,
    minAmount,
    deadLine,
  } = rowState.operationSubmitParams as CfmmOpeSellKitSubmitParams

  return cfmmOpeHandleSubmitRequest(
    cfmmOpeSellKitSubmitRequest(rowState.scAddress, amount, minAmount, deadLine),
    'cfmmOpe/sellKitSubmit',
    'cfmmOpe/sellKitConfirm',
    rowState,
  )
}

const cfmmOpeSellKitSubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: CfmmOpeAction) => x.payload),
    filter((x: CfmmOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: CfmmOpeRowState) => submitSellKit(x)),
  )

// epic factory in order an epic based on the action type
const cfmmOpeSellKitConfirmEpic = createCfmmOpeConfirmEpic('cfmmOpe/sellKitConfirm')

export const cfmmOpeSellKitEpics = combineEpics(cfmmOpeSellKitSubmitEpic, cfmmOpeSellKitConfirmEpic)
