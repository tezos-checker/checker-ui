import { CheckerState } from '@config'
import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectPostState = (state: CheckerState) => state.posts

export const postRequestStatusSelector = createDraftSafeSelector(selectPostState, (postState) => ({
  status: postState.requestStatus,
  errorMsg: postState.errorMsg,
}))
