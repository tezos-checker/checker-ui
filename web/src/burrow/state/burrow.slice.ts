import { RootState } from '@config'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { BurrowCreationAction } from './action/burrow-creation.action/burrow-creation-action.type'
import { BurrowOperationAction } from './action/burrow-operation.action/burrow-operation-action.type'
import {
  BurrowLoadStorageAction,
  BurrowLoadStorageResultAction,
} from './action/burrow-storage.action/burrow-storage-action.type'
import {
  BurrowEntityAdapter,
  BurrowEntitySelector,
  BurrowRowState,
  BurrowSlice,
} from './burrow-state.type'
import { burrowCreationReducer } from './reducer/burrow-creation.reducer/burrow-creation.reducer'
import { burrowUpdateOperationReducer } from './reducer/burrow-operation.reducer/burrow-update-operation.reducer'
import { burrowLoadStorageReducer } from './reducer/burrow-storage.reducer/burrow-load-storage.reducer'
import { burrowUpdateStorageReducer } from './reducer/burrow-storage.reducer/burrow-update-storage.reducer'

export const burrowAdapter: BurrowEntityAdapter = createEntityAdapter<BurrowRowState>({
  selectId: (burrow) => burrow.burrowId,
})

export const burrowSelectors: BurrowEntitySelector = burrowAdapter.getSelectors<RootState>(
  (state) => state.burrow,
)

export const burrowSlice: BurrowSlice = createSlice({
  name: 'burrow',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {
    updateBurrow: burrowAdapter.upsertOne,
    removeBurrow: burrowAdapter.removeOne,
    creation: (state, action: BurrowCreationAction) =>
      burrowCreationReducer(state, action, burrowAdapter),
    updateOperation: (state, action: BurrowOperationAction) =>
      burrowUpdateOperationReducer(state, action, burrowAdapter),
    loadStorage: (state, action: BurrowLoadStorageAction) =>
      burrowLoadStorageReducer(state, action, burrowAdapter),
    updateStorage: (state, action: BurrowLoadStorageResultAction) =>
      burrowUpdateStorageReducer(state, action, burrowAdapter),
  },
})

export const burrowActions = burrowSlice.actions
