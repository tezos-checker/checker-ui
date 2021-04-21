import { RequestStatus } from '@api'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { CancelToken } from 'axios'
import { Post } from './post-state.type'
import {
  LoadPostAction,
  LoadPostErrorAction,
  loadPostErrorReducer,
  loadPostReducer,
  LoadPostSuccessAction,
  loadPostSuccessReducer,
} from './post/post-reducer'

export const postAdapter = createEntityAdapter<Post>({
  // Assume IDs are stored in a field other than `person.id`
  selectId: (post) => post.id,
})

export const postSlice = createSlice({
  name: 'post',
  initialState: postAdapter.getInitialState({
    requestStatus: RequestStatus.idle,
    axiosCancelToken: {} as CancelToken,
    errorMsg: '',
  }),
  reducers: {
    addPost: postAdapter.addOne,
    deletePost: postAdapter.removeOne,

    loadPost: (state, action: LoadPostAction): void => loadPostReducer(state),
    loadPostSuccess: (state, action: LoadPostSuccessAction) =>
      loadPostSuccessReducer(state, action, postAdapter),
    loadPostError: (state, action: LoadPostErrorAction) => loadPostErrorReducer(state, action),
  },
})
