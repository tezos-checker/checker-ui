import { RequestStatus, RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ScStorageRowState } from './sc-storage.type'

const initialState = {
  ids: [1],
  entities: {
    1: {
      id: 1,
      status: RequestStatus.idle,
      errMsg: '',
      content: null,
    },
  },
}

export const scStorageAdapter = createEntityAdapter<ScStorageRowState>()
export const scStorageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    loadStorage: scStorageAdapter.upsertOne,
  },
})

export const scStorageActions = scStorageSlice.actions
export const scStorageSelectors = scStorageAdapter.getSelectors<RootState>(
  (state) => state.scStorage,
)
