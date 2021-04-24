import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { counterSlice } from '../example/counter/state/counter.slice'
import { personSlice } from '../example/person/state/person.slice'
import { postSlice } from '../example/post/state/post.slice'
import { fetchPostEpic } from '../example/post/state/post/post-epic'
import { opIncrementEpic } from '../sc-operation/state/op-increment/op-increment-epic'
import { scOperationSlice } from '../sc-operation/state/sc-operation.slice'
import { walletEpics } from '../wallet/state/wallet.epics'
import { walletSlice } from '../wallet/state/wallet.slice'

const epicMiddleware = createEpicMiddleware()

const checkerStore = configureStore({
  reducer: {
    // TODO delete once the project has started
    counter: counterSlice.reducer,
    persons: personSlice.reducer,
    posts: postSlice.reducer,

    // PROJECT
    wallet: walletSlice.reducer,
    scOperations: scOperationSlice.reducer,
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

epicMiddleware.run(combineEpics(fetchPostEpic, walletEpics, opIncrementEpic))

export const store = checkerStore
