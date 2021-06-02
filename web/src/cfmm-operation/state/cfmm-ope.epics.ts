import { combineEpics } from 'redux-observable'
import { cfmmOpeBuyKitEpics } from '../cfmm-ope-buy-kit/cfmm-buy-kit.epics'

export const cfmmOpeEpics = combineEpics(cfmmOpeBuyKitEpics)
