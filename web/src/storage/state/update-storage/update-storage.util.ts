import { LoadStorageResultAction } from '../load-storage/load-storage.type'
import { StorageRow } from '../storage-state.type'

export const getUpdateStorageAction = (payload: StorageRow): LoadStorageResultAction => ({
  type: 'storage/updateStorage',
  payload,
})

export const getUpdateCheckerStorageAction = (payload: StorageRow): LoadStorageResultAction => ({
  type: 'storage/updateCheckerStorage',
  payload,
})
