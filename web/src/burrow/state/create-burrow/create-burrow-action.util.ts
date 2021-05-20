import { BurrowRowState } from '../burrow-state.type'
import { CreationBurrowAction } from './create-burrow-action.type'

export const getCreateBurrowAction = (payload: BurrowRowState): CreationBurrowAction => ({
  type: 'burrow/createBurrow',
  payload,
})
