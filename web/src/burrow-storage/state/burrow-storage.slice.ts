import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { BurrowStorageRow } from './burrow-storage.type'

export const burrowStorageAdapter = createEntityAdapter<BurrowStorageRow>({
  selectId: (burrowStorage) => burrowStorage.burrowId,
})

export const burrowStorageSelectors = burrowStorageAdapter.getSelectors<RootState>(
  (state) => state.burrow,
)

export const burrowStorageSlice = createSlice({
  name: 'burrowStorage',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    updateBurrowStorage: burrowStorageAdapter.upsertOne,
    deleteBurrowStorage: burrowStorageAdapter.removeOne,
  },
})

export const burrowStorageActions = burrowStorageSlice.actions

export const burrowStorageReducer = burrowStorageSlice.reducer
