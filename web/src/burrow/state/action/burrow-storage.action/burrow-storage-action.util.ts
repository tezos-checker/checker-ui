import {
  BurrowLoadStorageAction,
  BurrowLoadStorageActionPayload,
  BurrowLoadStorageResultAction,
  BurrowLoadStorageResultActionPayload,
} from './burrow-storage-action.type'

// Load burrow storage
export const getLoadBurrowStorageAction = (
  payload: BurrowLoadStorageActionPayload,
): BurrowLoadStorageAction => ({
  type: 'burrow/loadBurrowStorage',
  payload,
})

// burrow storage result ( success or error )
export const getLoadBurrowStorageResultAction = (
  payload: BurrowLoadStorageResultActionPayload,
): BurrowLoadStorageResultAction => ({
  type: 'burrow/updateBurrowStorage',
  payload: payload,
})
