import { RequestStatus } from '@api'
import { EntityAdapter, PayloadAction } from '@reduxjs/toolkit'
import { CancelToken } from 'axios'
import { Post, PostState } from '../post-state.type'

export type LoadPostAction = PayloadAction<{ postId: number; axiosCancelToken: CancelToken }>
export type LoadPostErrorAction = PayloadAction<string>
export type LoadPostSuccessAction = PayloadAction<Post>

export const loadPostReducer = (state: PostState): PostState => ({
  ...state,
  requestStatus: RequestStatus.loading,
})

export const loadPostSuccessReducer = (
  state: PostState,
  action: LoadPostSuccessAction,
  postAdapter: EntityAdapter<Post>,
) => ({
  ...postAdapter.addOne(state, action.payload),
  requestStatus: RequestStatus.success,
  cancelToken: null,
})

export const loadPostErrorReducer = (state: PostState, action: LoadPostErrorAction) => ({
  ...state,
  requestStatus: RequestStatus.error,
  cancelToken: null,
  errorMsg: action.payload,
})
