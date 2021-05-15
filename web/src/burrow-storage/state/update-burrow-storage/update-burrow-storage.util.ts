import { BurrowStorageRow } from '../burrow-storage.type'
import { BurrowLoadStorageResultAction } from '../load-burrow-storage/load-burrow-storage.type'

// burrow storage result ( success or error )
export const getUpdateStorageAction = (
  payload: BurrowStorageRow,
): BurrowLoadStorageResultAction => ({
  type: 'burrowStorage/updateStorage',
  payload,
})
