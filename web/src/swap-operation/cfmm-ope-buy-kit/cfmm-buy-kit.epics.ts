import { isPendingRequest } from '@shared/utils'
import { combineEpics, ofType } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { createCfmmOpeConfirmEpic } from '../common/cfmm-ope-common-confirm.epic'
import { CfmmOpeAction, CfmmOpeRowState } from '../state/cfmm-ope-state.type'
import { cfmmOpeHandleSubmitRequest } from '../state/cfmm-ope-state.utils'
import { CfmmOpeBuyKitSubmitParams, cfmmOpeBuyKitSubmitRequest } from './cfmm-ope-buy-kit.api'

const actionType = 'cfmmOpe/buyKitSubmit'

const submitBuyKit = (rowState: CfmmOpeRowState): Observable<CfmmOpeAction> => {
  const {
    amount,
    minExpected,
    deadLine,
  } = rowState.operationSubmitParams as CfmmOpeBuyKitSubmitParams

  return cfmmOpeHandleSubmitRequest(
    cfmmOpeBuyKitSubmitRequest(rowState.scAddress, amount, minExpected, deadLine),
    'cfmmOpe/buyKitSubmit',
    'cfmmOpe/buyKitConfirm',
    rowState,
  )
}

const cfmmOpeBuyKitSubmitEpic = (action$: any) =>
  action$.pipe(
    ofType(actionType),
    map((x: CfmmOpeAction) => x.payload),
    filter((x: CfmmOpeRowState) => isPendingRequest(x.status)),
    mergeMap((x: CfmmOpeRowState) => submitBuyKit(x)),
  )

// epic factory in order an epic based on the action type
const cfmmOpeBuyKitConfirmEpic = createCfmmOpeConfirmEpic('cfmmOpe/buyKitConfirm')

export const cfmmOpeBuyKitEpics = combineEpics(cfmmOpeBuyKitSubmitEpic, cfmmOpeBuyKitConfirmEpic)
