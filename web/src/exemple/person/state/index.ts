import { RootState, store } from '@config'
import { personAdapter, personSlice } from './person.slice'

export const personActions = personSlice.actions

// Can create a set of memoized selectors based on the location of this entity state
export const personsSelectors = personAdapter.getSelectors<RootState>((state) => state.persons)
