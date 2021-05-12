import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ScOperationRowState } from './sc-ope-state.type'

export const scOpeAdapter = createEntityAdapter<ScOperationRowState>({
  selectId: (operation) => operation.operationId,
})

export const scOpeSlice = createSlice({
  name: 'operation',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    incrementSubmit: scOpeAdapter.upsertOne,
    incrementConfirm: scOpeAdapter.upsertOne,
    createBurrowSubmit: scOpeAdapter.upsertOne,
    createBurrowConfirm: scOpeAdapter.upsertOne,
    depositTezSubmit: scOpeAdapter.upsertOne,
    depositTezConfirm: scOpeAdapter.upsertOne,
  },
})

export const scOpeActions = scOpeSlice.actions
