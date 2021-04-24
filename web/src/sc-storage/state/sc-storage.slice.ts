import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ScStorage } from './sc-storage.type'

export const scStorageAdapter = createEntityAdapter<ScStorage>()
export const scStorageSlice = createSlice({
  name: 'storage',
  initialState: scStorageAdapter.getInitialState(),
  reducers: {
    loadStorage: scStorageAdapter.upsertOne,
  },
})

export const scStorageActions = scStorageSlice.actions
export const scStorageSelectors = scStorageAdapter.getSelectors<RootState>(
  (state) => state.scStorage,
)
