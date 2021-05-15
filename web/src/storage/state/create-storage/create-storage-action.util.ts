import { StorageRow } from '../storage-state.type'
import { CreateStorageAction } from './create-storage.type'

export const getCreateStorageAction = (payload: StorageRow): CreateStorageAction => ({
  type: 'storage/createStorage',
  payload,
})
