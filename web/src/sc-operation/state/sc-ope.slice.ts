import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ScOpePayload } from './sc-ope-state.type'

export const scOpeAdapter = createEntityAdapter<ScOpePayload>()

export const scOpeSlice = createSlice({
  name: 'operation',
  initialState: scOpeAdapter.getInitialState({
    params: {},
  }),
  reducers: {
    increment: scOpeAdapter.upsertOne,
  },
})

export const scOpeActions = scOpeSlice.actions
