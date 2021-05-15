import { BlockResponse } from '@taquito/rpc'
import { TransactionWalletOperation } from '@taquito/taquito'

export const burrowOpeConfirmRequest = async (
  op: TransactionWalletOperation,
  numberOfConfirmation = 1,
): Promise<BlockResponse> => {
  const resp = await op.confirmation(numberOfConfirmation)
  return resp.block
}
