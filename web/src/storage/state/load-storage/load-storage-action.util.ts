import { StorageRow } from '../storage-state.type'
import { LoadStorageResultAction } from './load-storage.type'

export const getLoadStorageAction = (payload: StorageRow): LoadStorageResultAction => ({
  type: 'storage/loadStorage',
  payload,
})
