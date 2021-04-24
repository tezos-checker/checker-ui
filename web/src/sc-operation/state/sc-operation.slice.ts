import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ScOperation } from './sc-operation-state.type'

export const scOperationAdapter = createEntityAdapter<ScOperation>()

export const scOperationSlice = createSlice({
  name: 'operation',
  initialState: scOperationAdapter.getInitialState({
    params: {},
  }),
  reducers: {
    increment: scOperationAdapter.upsertOne,
  },
})

export const scOperationActions = scOperationSlice.actions
export const scOperationSelectors = scOperationAdapter.getSelectors<RootState>(
  (state) => state.scOperations,
)
