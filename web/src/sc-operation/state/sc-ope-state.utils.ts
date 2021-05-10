import { AbstractAction, RequestStatus } from '@config'
import { ScOperationRowState } from './sc-ope-state.type'

export const createOperationErrorAction = (
  actionType: string,
  rowState: ScOperationRowState,
  errorMsg: string,
): AbstractAction<ScOperationRowState> => ({
  type: actionType,
  payload: {
    ...rowState,
    status: RequestStatus.error,
    errorMsg,
  },
})
