import { BurrowStorageRow } from '../burrow-storage.type'
import { CreateBurrowStorageAction } from './create-burrow-storage.type'

export const getCreateBurrowStorageAction = (
  payload: BurrowStorageRow,
): CreateBurrowStorageAction => ({
  type: 'burrowStorage/createStorage',
  payload,
})
