import { BurrowOperationAction } from '../../action/burrow-operation.action/burrow-operation-action.type'
import { BurrowEntityAdapter, BurrowState } from '../../burrow-state.type'

export const burrowUpdateOperationReducer = (
  state: BurrowState,
  action: BurrowOperationAction,
  burrowAdapter: BurrowEntityAdapter,
): void => {
  // eslint-disable-next-line
  debugger
  const { burrowId, operationName, status, errorMsg } = action.payload
  const burrow = state.entities[burrowId]
  if (burrow) {
    burrow.currentOperation.status = status
    burrow.currentOperation.operationName = operationName
    burrow.currentOperation.errorMsg = errorMsg
    burrowAdapter.upsertOne(state, burrow)
  }
}
