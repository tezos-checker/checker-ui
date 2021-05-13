import { BurrowOperationAction, BurrowOperationActionPayload } from './burrow-operation-action.type'

export const getUpdateBurrowOperationAction = (
  payload: BurrowOperationActionPayload,
): BurrowOperationAction => ({
  type: 'burrow/updateBurrowOperation',
  payload: payload,
})
