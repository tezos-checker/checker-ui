import { LoadStorageResultAction } from '../load-storage/load-storage.type'
import { BurrowStorageRow } from '../storage-state.type'

// burrow storage result ( success or error )
export const getUpdateStorageAction = (payload: BurrowStorageRow): LoadStorageResultAction => ({
  type: 'storage/updateStorage',
  payload,
})
