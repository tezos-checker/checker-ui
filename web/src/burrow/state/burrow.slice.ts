import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { BurrowCreationAction } from './action/burrow-creation.action/burrow-creation-action.type'
import { BurrowEntityAdapter, BurrowEntitySelector, BurrowRowState } from './burrow-state.type'
import { burrowCreationReducer } from './reducer/burrow-creation.reducer/burrow-creation.reducer'

export const burrowAdapter: BurrowEntityAdapter = createEntityAdapter<BurrowRowState>({
  selectId: (burrow) => burrow.burrowId,
})

export const burrowSelectors: BurrowEntitySelector = burrowAdapter.getSelectors<RootState>(
  (state) => state.burrow,
)

export const burrowSlice = createSlice({
  name: 'burrow',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    updateBurrow: burrowAdapter.upsertOne,
    removeBurrow: burrowAdapter.removeOne,
    creation: (state, action: BurrowCreationAction) =>
      burrowCreationReducer(state, action, burrowAdapter),
  },
})

export const burrowActions = burrowSlice.actions
