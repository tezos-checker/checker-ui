import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ScDeployContractRowState } from './sc-deploy-contract.type'

export const scDeployContractAdapter = createEntityAdapter<ScDeployContractRowState>()
export const scDeployContractSlice = createSlice({
  name: 'deployContract',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    submit: scDeployContractAdapter.upsertOne,
    confirm: scDeployContractAdapter.upsertOne,
  },
})

export const scStorageActions = scDeployContractSlice.actions
export const scStorageSelectors = scDeployContractAdapter.getSelectors<RootState>(
  (state) => state.scDeployContract,
)
