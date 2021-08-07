import { combineEpics } from 'redux-observable'
import { cfmmOpeAddLiquidityEpics } from '../cfmm-add-liquidity/cfmm-add-liquidity.epics'
import { cfmmOpeRemoveLiquidityEpics } from '../cfmm-ope-remove-liquidity/cfmm-remove-liquidity.epics'
import { cfmmOpeBuyKitEpics } from '../swap-operation-buy/swap-ope-buy.epics'
import { cfmmOpeSellKitEpics } from '../swap-operation-sell/swap-ope-sell.epics'

export const cfmmOpeEpics = combineEpics(
  cfmmOpeBuyKitEpics,
  cfmmOpeSellKitEpics,
  cfmmOpeAddLiquidityEpics,
  cfmmOpeRemoveLiquidityEpics,
)
