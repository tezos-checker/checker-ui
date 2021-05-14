import { BurrowEntityAdapter, BurrowState } from '../../../burrow/state/burrow-state.type'
import { BurrowLoadStorageAction } from '../burrow-storage.action/burrow-storage-action.type'

export const burrowLoadStorageReducer = (
  state: BurrowState,
  action: BurrowLoadStorageAction,
  burrowAdapter: BurrowEntityAdapter,
): void => {
  /*  const { burrowId } = action.payload
  const burrow = state.entities[burrowId]
  if (burrow) {
    burrow.storage.status = RequestStatus.pending
    burrowAdapter.upsertOne(state, burrow) 
  } */
}
