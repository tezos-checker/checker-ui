import { RequestStatus } from '@config'
import { BurrowLoadStorageAction } from '../../action/burrow-storage.action/burrow-storage-action.type'
import { BurrowEntityAdapter, BurrowState } from '../../burrow-state.type'

export const burrowLoadStorageReducer = (
  state: BurrowState,
  action: BurrowLoadStorageAction,
  burrowAdapter: BurrowEntityAdapter,
): void => {
  const { burrowId } = action.payload
  const burrow = state.entities[burrowId]
  if (burrow) {
    burrow.storage.status = RequestStatus.pending
    burrowAdapter.upsertOne(state, burrow)
  }
}
