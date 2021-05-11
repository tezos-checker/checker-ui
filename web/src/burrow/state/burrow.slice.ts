import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { BurrowRowState } from './burrow-state.type'

export const burrowAdapter = createEntityAdapter<BurrowRowState>({
  selectId: (burrow) => burrow.burrowId,
})
export const burrowSlice = createSlice({
  name: 'burrow',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    updateBurrow: burrowAdapter.upsertOne,
    removeBurrow: burrowAdapter.removeOne,
  },
})

export const burrowActions = burrowSlice.actions
export const burrowSelectors = burrowAdapter.getSelectors<RootState>((state) => state.burrow)
