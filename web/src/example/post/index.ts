import { RootState } from '@config'
import { postAdapter, postSlice } from './state/post.slice'

export const postActions = postSlice.actions

// Can create a set of memoized selectors based on the location of this entity state
export const postSelectors = postAdapter.getSelectors<RootState>((state) => state.posts)
