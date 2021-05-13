import { BurrowLoadStorageResultAction } from '../../action/burrow-storage.action/burrow-storage-action.type'
import { BurrowEntityAdapter, BurrowState } from '../../burrow-state.type'

export const burrowUpdateStorageReducer = (
  state: BurrowState,
  action: BurrowLoadStorageResultAction,
  burrowAdapter: BurrowEntityAdapter,
): void => {
  const { burrowId, status, storage } = action.payload
  const burrow = state.entities[burrowId]
  if (burrow) {
    burrow.storage.status = status
    if (storage) {
      burrow.storage.storage = storage
    }
    burrowAdapter.upsertOne(state, burrow)
  }
}
