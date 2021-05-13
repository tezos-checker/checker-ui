import { BurrowOperationAction, BurrowOperationActionPayload } from './burrow-operation-action.type'

export const getUpdateBurrowOperationAction = (
  payload: BurrowOperationActionPayload,
): BurrowOperationAction => ({
  type: 'burrow/updateOperation',
  payload,
})
