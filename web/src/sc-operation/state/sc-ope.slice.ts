import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ScOperationRowState } from './sc-ope-state.type'

export const scOpeAdapter = createEntityAdapter<ScOperationRowState>()

export const scOpeSlice = createSlice({
  name: 'operation',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    incrementSubmit: scOpeAdapter.upsertOne,
    incrementConfirm: scOpeAdapter.upsertOne,
  },
})

export const scOpeActions = scOpeSlice.actions
