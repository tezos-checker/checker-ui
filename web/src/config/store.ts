import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { scOpeIncrementEpic } from '../sc-operation/state/sc-ope-increment/sc-ope-increment-epic'
import { scOpeSlice } from '../sc-operation/state/sc-ope.slice'
import { loadStorageEpic } from '../sc-storage/state/sc-storage.epic'
import { scStorageSlice } from '../sc-storage/state/sc-storage.slice'
import { loadWalletEpic } from '../wallet/state/wallet-epic'
import { walletSlice } from '../wallet/state/wallet.slice'

const epicMiddleware = createEpicMiddleware()

const checkerStore = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
    scOperations: scOpeSlice.reducer,
    scStorage: scStorageSlice.reducer,
  },
  middleware: [epicMiddleware],
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

epicMiddleware.run(combineEpics(loadWalletEpic, scOpeIncrementEpic, loadStorageEpic))

export const store = checkerStore
