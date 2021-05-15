import { configureStore } from '@reduxjs/toolkit'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { burrowOpeCreateBurrowEpics } from '../../burrow-operation/burrow-ope-create-burrow/burrow-ope-create-burrow.epics'
import { burrowOpeDepositTezEpics } from '../../burrow-operation/burrow-ope-deposit-tez/burrow-deposit-tez.epics'
import { burrowOpeSlice } from '../../burrow-operation/state/burrow-ope.slice'
import { burrowSlice } from '../../burrow/state/burrow.slice'
import { createBurrowEpics } from '../../burrow/state/epic/create-burrow.epics'
import { loadWalletEpic } from '../../wallet/state/wallet-epic'
import { walletSlice } from '../../wallet/state/wallet.slice'
import { loadState } from './store-persist.util'

const epicMiddleware = createEpicMiddleware()

const checkerStore = configureStore({
  preloadedState: loadState(),
  reducer: {
    wallet: walletSlice.reducer,
    burrow: burrowSlice.reducer,
    burrowOperation: burrowOpeSlice.reducer,
  },
  middleware: [epicMiddleware],
})

epicMiddleware.run(
  combineEpics(
    loadWalletEpic,

    createBurrowEpics,
    burrowOpeDepositTezEpics,
    burrowOpeCreateBurrowEpics,
  ),
)

export const store = checkerStore
