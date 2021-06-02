import { burrowEpics, burrowReducer } from '@burrow'
import { burrowOpeEpics, burrowOpeReducers } from '@burrow-operation'
import { cfmmOpeReducers } from '@cfmm-operation'
import { configureStore } from '@reduxjs/toolkit'
import { storageEpics, storageReducer } from '@storage'
import { walletEpics, walletReducer } from '@wallet'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { loadState } from './store-persist.util'

const epicMiddleware = createEpicMiddleware()

const checkerStore = configureStore({
  preloadedState: loadState(),
  reducer: {
    wallet: walletReducer,
    burrow: burrowReducer,
    burrowOperation: burrowOpeReducers,
    storage: storageReducer,
    cfmmOperation: cfmmOpeReducers,
  },
  middleware: [epicMiddleware],
})

epicMiddleware.run(
  combineEpics(
    walletEpics,

    burrowEpics,
    burrowOpeEpics,
    storageEpics,
  ),
)

export const store = checkerStore
