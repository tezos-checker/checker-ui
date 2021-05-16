import { TransactionOperationParams } from '@burrow-operation'
import { BlockResponse } from '@taquito/rpc'

export const burrowOpeConfirmRequest = async (
  op: TransactionOperationParams,
  numberOfConfirmation = 1,
): Promise<BlockResponse> => {
  const resp = await op.confirmOperation(numberOfConfirmation)
  return resp.block
}
