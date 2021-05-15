import { BurrowStorageRow } from '../storage-state.type'
import { LoadStorageResultAction } from './load-storage.type'

export const getLoadStorageAction = (payload: BurrowStorageRow): LoadStorageResultAction => ({
  type: 'storage/loadStorage',
  payload,
})
