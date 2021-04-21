import { RootState } from '@config'
import { postAdapter, postSlice } from './state/post.slice'

export const personActions = postSlice.actions

// Can create a set of memoized selectors based on the location of this entity state
export const personsSelectors = postAdapter.getSelectors<RootState>((state) => state.posts)
