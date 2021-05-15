import {
  CreateBurrowPayload,
  CreationBurrowAction,
  DeleteBurrowAction,
} from './burrow-creation-action.type'

export const getCreateBurrowAction = (x: CreateBurrowPayload): CreationBurrowAction => ({
  type: 'burrow/createBurrow',
  payload: {
    scAddress: x.scAddress,
    burrowId: x.burrowId,
  },
})

export const getDeleteBurrowAction = (payload: number): DeleteBurrowAction => ({
  type: 'burrow/deleteBurrow',
  payload,
})
