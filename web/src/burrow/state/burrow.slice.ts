import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { BurrowEntityAdapter, BurrowEntitySelector, BurrowRowState } from './burrow-state.type'

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
    deleteBurrow: burrowAdapter.removeOne,
    createBurrow: burrowAdapter.upsertOne,
  },
})

export const burrowActions = burrowSlice.actions
