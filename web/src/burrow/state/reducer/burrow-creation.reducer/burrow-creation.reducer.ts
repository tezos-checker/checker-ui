import { RequestStatus } from '@config'
import { ScWalletOperation } from '../../../../sc-operation/state/sc-ope-state.type'
import { BurrowCreationAction } from '../../action/burrow-creation.action/burrow-creation-action.type'
import { BurrowEntityAdapter, BurrowRowState, BurrowState } from '../../burrow-state.type'

export const burrowCreationReducer = (
  state: BurrowState,
  action: BurrowCreationAction,
  burrowAdapter: BurrowEntityAdapter,
): void => {
  // eslint-disable-next-line
  debugger
  const { burrowId, scAddress, status, errorMsg } = action.payload

  const burrow = {
    burrowId,
    scAddress,
    currentOperation: {
      status,
      operationName: ScWalletOperation.create_burrow,
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
