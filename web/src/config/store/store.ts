import { burrowEpics, burrowReducer } from '@burrow'
import { burrowOpeEpics, burrowOpeReducers } from '@burrow-operation'
import { configureStore } from '@reduxjs/toolkit'
import { burrowStorageEpics, burrowStorageReducer } from '@storage'
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
    burrowStorage: burrowStorageReducer,
  },
  middleware: [epicMiddleware],
})

epicMiddleware.run(
  combineEpics(
    walletEpics,

    burrowEpics,
    burrowOpeEpics,
    burrowStorageEpics,
  ),
)

export const store = checkerStore
