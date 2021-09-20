import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { StorageRow } from './storage-state.type'

export const storageAdapter = createEntityAdapter<StorageRow>({
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
    loadCheckerStorage: storageAdapter.upsertOne,
    updateCheckerStorage: storageAdapter.upsertOne,
  },
})

export const { selectById: getStorageForBurrow } = storageAdapter.getSelectors(
  (state) => (state as RootState).storage,
)

export const storageActions = storageSlice.actions

export const storageReducer = storageSlice.reducer
