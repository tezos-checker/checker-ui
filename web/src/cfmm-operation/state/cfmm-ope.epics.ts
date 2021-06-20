import { combineEpics } from 'redux-observable'
import { cfmmOpeAddLiquidityEpics } from '../cfmm-add-liquidity/cfmm-add-liquidity.epics'
import { cfmmOpeBuyKitEpics } from '../cfmm-ope-buy-kit/cfmm-buy-kit.epics'
import { cfmmOpeRemoveLiquidityEpics } from '../cfmm-ope-remove-liquidity/cfmm-remove-liquidity.epics'

export const cfmmOpeEpics = combineEpics(
  cfmmOpeBuyKitEpics,
  cfmmOpeAddLiquidityEpics,
  cfmmOpeRemoveLiquidityEpics,
)
