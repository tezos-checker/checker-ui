import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { CfmmOpeRowState } from './cfmm-ope-state.type'

export const cfmmOpeAdapter = createEntityAdapter<CfmmOpeRowState>()

export const cfmmOpeSlice = createSlice({
  name: 'cfmmOpe',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    buyKitSubmit: cfmmOpeAdapter.upsertOne,
    buyKitConfirm: cfmmOpeAdapter.upsertOne,
    clearCfmmOpeMessage: cfmmOpeAdapter.upsertOne,
    deleteCfmmOpe: cfmmOpeAdapter.removeOne,
    resetPendingCfmmOpe: cfmmOpeAdapter.updateMany,
  },
})

export const {
  selectById: getOpeForCfmm,
  selectAll: getCfmmOperationList,
} = cfmmOpeAdapter.getSelectors((state) => (state as RootState).cfmmOperation)

export const cfmmOpeActions = cfmmOpeSlice.actions

export const cfmmOpeReducers = cfmmOpeSlice.reducer
