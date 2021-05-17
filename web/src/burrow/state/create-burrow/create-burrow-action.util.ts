import { CreateBurrowPayload, CreationBurrowAction } from './create-burrow-action.type'

export const getCreateBurrowAction = (x: CreateBurrowPayload): CreationBurrowAction => ({
  type: 'burrow/createBurrow',
  payload: {
    scAddress: x.scAddress,
    burrowId: x.burrowId,
  },
})
