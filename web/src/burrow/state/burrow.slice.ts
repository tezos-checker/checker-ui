import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { BurrowRowState } from './burrow-state.type'

export const burrowAdapter = createEntityAdapter<BurrowRowState>()
export const burrowSlice = createSlice({
  name: 'burrow',
  initialState: burrowAdapter.getInitialState(),
  reducers: {},
})

export const burrowActions = burrowSlice.actions
export const burrowSelectors = burrowAdapter.getSelectors<RootState>((state) => state.burrow)
