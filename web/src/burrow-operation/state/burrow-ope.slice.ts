import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { BurrowOpeRowState } from './burrow-ope-state.type'

export const burrowOpeAdapter = createEntityAdapter<BurrowOpeRowState>({
  selectId: (burrowOpe) => burrowOpe.burrowId,
})

export const burrowOpeSlice = createSlice({
  name: 'burrowOpe',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    createBurrowSubmit: burrowOpeAdapter.upsertOne,
    createBurrowConfirm: burrowOpeAdapter.upsertOne,
    depositTezSubmit: burrowOpeAdapter.upsertOne,
    depositTezConfirm: burrowOpeAdapter.upsertOne,
    withdrawTezSubmit: burrowOpeAdapter.upsertOne,
    withdrawTezConfirm: burrowOpeAdapter.upsertOne,
    mintKitSubmit: burrowOpeAdapter.upsertOne,
    mintKitConfirm: burrowOpeAdapter.upsertOne,
    burnKitSubmit: burrowOpeAdapter.upsertOne,
    burnKitConfirm: burrowOpeAdapter.upsertOne,
    buyKitSubmit: burrowOpeAdapter.upsertOne,
    buyKitConfirm: burrowOpeAdapter.upsertOne,
    sellKitSubmit: burrowOpeAdapter.upsertOne,
    sellKitConfirm: burrowOpeAdapter.upsertOne,
    clearBurrowOpeMessage: burrowOpeAdapter.upsertOne,
    deleteBurrowOpe: burrowOpeAdapter.removeOne,
    resetPendingBurrowOpe: burrowOpeAdapter.updateMany,
  },
})

export const { selectById: getOpeForBurrow } = burrowOpeAdapter.getSelectors(
  (state) => (state as RootState).burrowOperation,
)

export const burrowOpeActions = burrowOpeSlice.actions

export const burrowOpeReducers = burrowOpeSlice.reducer
