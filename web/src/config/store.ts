import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { counterSlice } from '../example/counter/state/counter.slice'
import { personSlice } from '../example/person/state/person.slice'
import { postSlice } from '../example/post/state/post.slice'

export const store = configureStore({
  reducer: {
    // TODO delete once the project has started
    counter: counterSlice.reducer,
    persons: personSlice.reducer,
    posts: postSlice.reducer,
  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
