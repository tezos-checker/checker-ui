import { store } from '@config'

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AbstractAction<T> = {
  type: string
  payload: T
}

export enum ScOperationStep {
  submit = 'submit',
  confirm = 'confirm',
  confirmed = 'confirmed',
}
