import { BlockResponse } from '@taquito/rpc'
import { TransactionOperationParams } from '../state/cfmm-ope-state.type'

export const cfmmOpeConfirmRequest = async (
  op: TransactionOperationParams,
  numberOfConfirmation = 1,
): Promise<BlockResponse> => {
  const resp = await op.confirmOperation(numberOfConfirmation)
  return resp.block
}
