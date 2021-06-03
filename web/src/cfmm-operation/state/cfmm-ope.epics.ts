import { combineEpics } from 'redux-observable'
import { cfmmOpeAddLiquidityEpics } from '../cfmm-add-liquidity/cfmm-add-liquidity.epics'
import { cfmmOpeBuyKitEpics } from '../cfmm-ope-buy-kit/cfmm-buy-kit.epics'

export const cfmmOpeEpics = combineEpics(cfmmOpeBuyKitEpics, cfmmOpeAddLiquidityEpics)
