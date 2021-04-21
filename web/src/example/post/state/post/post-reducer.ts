/*  eslint no-param-reassign: "error" */
import { RequestStatus } from '@api'
import { EntityAdapter, PayloadAction } from '@reduxjs/toolkit'
import { CancelToken } from 'axios'
import { EntityPostState, Post } from '../post-state.type'

export type LoadPostAction = PayloadAction<{ postId: number; axiosCancelToken: CancelToken }>
export type LoadPostErrorAction = PayloadAction<string>
export type LoadPostSuccessAction = PayloadAction<Post>

// /!\ As we work with an adaptater, we don't need to return a new state
export const loadPostReducer = (state: EntityPostState) => {
  state.requestStatus = RequestStatus.loading
}

export const loadPostSuccessReducer = (
  state: EntityPostState,
  action: LoadPostSuccessAction,
  postAdapter: EntityAdapter<Post>,
) => {
  postAdapter.addOne(state, action.payload)
  state.requestStatus = RequestStatus.success
  state.axiosCancelToken = undefined
}

export const loadPostErrorReducer = (state: EntityPostState, action: LoadPostErrorAction) => {
  state.requestStatus = RequestStatus.error
  state.errorMsg = action.payload
  state.axiosCancelToken = undefined
}
