import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { BurrowStorageRow } from './burrow-storage.type'

export const burrowStorageAdapter = createEntityAdapter<BurrowStorageRow>({
  selectId: (burrowStorage) => burrowStorage.burrowId,
})

export const burrowStorageSlice = createSlice({
  name: 'burrowStorage',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    createStorage: burrowStorageAdapter.addOne,
    loadStorage: burrowStorageAdapter.upsertOne,
    updateStorage: burrowStorageAdapter.upsertOne,
    deleteBurrowStorage: burrowStorageAdapter.removeOne,
  },
})

export const { selectById: getStorageForBurrow } = burrowStorageAdapter.getSelectors(
  (state) => (state as RootState).burrowStorage,
)

export const burrowStorageActions = burrowStorageSlice.actions

export const burrowStorageReducer = burrowStorageSlice.reducer
