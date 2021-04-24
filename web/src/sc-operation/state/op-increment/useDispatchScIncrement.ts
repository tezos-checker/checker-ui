import { RequestStatus } from '@api'
import { useAppDispatch } from '@config'
import {
  IncrementTransfertOpParams,
  ScOperationStatus,
  ScTypeOperation,
} from '../sc-operation-state.type'
import { scOperationActions } from '../sc-operation.slice'

export const dispatchScIncrement = (value: number, amount: number, nbConfirmation: number) => {
  const dispatch = useAppDispatch()
  const operationParams: IncrementTransfertOpParams = {
    value,
    nbConfirmation,
  }

  return () =>
    dispatch(
      scOperationActions.increment({
        id: `${Math.floor(Math.random() * 99)}_${new Date().getTime()}`,
        operationType: ScTypeOperation.increment,
        operationStatus: ScOperationStatus.transfert,
        status: RequestStatus.pending,
        errorMsg: '',
        operationParams,
        amount,
      }),
    )
}
