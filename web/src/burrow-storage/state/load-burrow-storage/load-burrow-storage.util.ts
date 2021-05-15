import { BurrowStorageRow } from '../burrow-storage.type'
import { BurrowLoadStorageResultAction } from './load-burrow-storage.type'

export const getLoadStorageAction = (payload: BurrowStorageRow): BurrowLoadStorageResultAction => ({
  type: 'burrowStorage/loadStorage',
  payload,
})
