import { BurrowCreationAction, BurrowCreationActionPayload } from './burrow-creation-action.type'

export const getBurrowCreationAction = (
  payload: BurrowCreationActionPayload,
): BurrowCreationAction => ({
  type: 'burrow/creation',
  payload,
})
