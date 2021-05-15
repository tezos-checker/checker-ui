import {
  BurrowLoadStorageAction,
  BurrowLoadStoragePayload,
  BurrowLoadStorageResultAction,
  BurrowLoadStorageResultPayload,
} from './burrow-storage-action.type'

// Load burrow storage
export const getLoadStorageAction = (
  payload: BurrowLoadStoragePayload,
): BurrowLoadStorageAction => ({
  type: 'burrow/loadStorage',
  payload,
})

// burrow storage result ( success or error )
export const getUpdateStorageAction = (
  payload: BurrowLoadStorageResultPayload,
): BurrowLoadStorageResultAction => ({
  type: 'burrow/updateStorage',
  payload,
})
