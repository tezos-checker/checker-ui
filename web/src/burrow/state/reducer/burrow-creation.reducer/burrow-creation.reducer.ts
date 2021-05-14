import { RequestStatus } from '@config'
import { BurrowOpeEnum } from '../../../../burrow-operation/state/burrow-ope-state.type'
import { BurrowCreationAction } from '../../action/burrow-creation.action/burrow-creation-action.type'
import { BurrowEntityAdapter, BurrowRowState, BurrowState } from '../../burrow-state.type'

export const burrowCreationReducer = (
  state: BurrowState,
  action: BurrowCreationAction,
  burrowAdapter: BurrowEntityAdapter,
): void => {
  const { burrowId, scAddress, status, errorMsg } = action.payload

  const burrow = {
    burrowId,
    scAddress,
    currentOperation: {
      status,
      operationName: BurrowOpeEnum.create_burrow,
      errorMsg,
    },
    storage: {
      status: RequestStatus.idle,
      errorMsg: '',
      storage: null,
    },
  } as BurrowRowState

  burrowAdapter.upsertOne(state, burrow)
}
