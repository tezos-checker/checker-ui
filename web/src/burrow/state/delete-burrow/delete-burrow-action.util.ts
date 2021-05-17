import { DeleteBurrowAction } from './delete-burrow-action.type'

export const getDeleteBurrowAction = (payload: number): DeleteBurrowAction => ({
  type: 'burrow/deleteBurrow',
  payload,
})
