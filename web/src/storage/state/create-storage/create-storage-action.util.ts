import { BurrowStorageRow } from '../storage-state.type'
import { CreateStorageAction } from './create-storage.type'

export const getCreateStorageAction = (payload: BurrowStorageRow): CreateStorageAction => ({
  type: 'storage/createStorage',
  payload,
})
