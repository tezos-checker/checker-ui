import { AbstractAction, RequestStatus } from '@config'
import { BurrowOpeRowState } from './burrow-ope-state.type'

export const createOperationErrorAction = (
  actionType: string,
  rowState: BurrowOpeRowState,
  errorMsg: string,
): AbstractAction<BurrowOpeRowState> => ({
  type: actionType,
  payload: {
    ...rowState,
    status: RequestStatus.error,
    errorMsg,
  },
})
