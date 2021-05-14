import {
  BurrowLoadStorageAction,
  BurrowLoadStorageActionPayload,
  BurrowLoadStorageResultAction,
  BurrowLoadStorageResultActionPayload,
} from './burrow-storage-action.type'

// Load burrow storage
export const getLoadStorageAction = (
  payload: BurrowLoadStorageActionPayload,
): BurrowLoadStorageAction => ({
  type: 'burrow/loadStorage',
  payload,
})

// burrow storage result ( success or error )
export const getUpdateStorageAction = (
  payload: BurrowLoadStorageResultActionPayload,
): BurrowLoadStorageResultAction => ({
  type: 'burrow/updateStorage',
  payload,
})
