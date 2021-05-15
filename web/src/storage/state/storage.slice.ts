import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { BurrowStorageRow } from './storage-state.type'

export const storageAdapter = createEntityAdapter<BurrowStorageRow>({
  selectId: (storage) => storage.burrowId,
})

export const storageSlice = createSlice({
  name: 'storage',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    createStorage: storageAdapter.addOne,
    loadStorage: storageAdapter.upsertOne,
    updateStorage: storageAdapter.upsertOne,
    deleteBurrowStorage: storageAdapter.removeOne,
  },
})

export const { selectById: getStorageForBurrow } = storageAdapter.getSelectors(
  (state) => (state as RootState).storage,
)

export const storageActions = storageSlice.actions

export const storageReducer = storageSlice.reducer
