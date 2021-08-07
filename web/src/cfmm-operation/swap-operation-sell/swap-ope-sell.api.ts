import { TransactionWalletOperation } from '@taquito/taquito'
import { getWalletContract } from '@wallet'

export type CfmmOpeSellKitSubmitParams = {
  amount: number
  minAmount: number
  deadLine: Date
}

export const SwapOpeSellSubmitRequest = async (
  scAddress: string,
  amount: number,
  minAmount: number,
  deadLine: Date,
): Promise<TransactionWalletOperation> => {
  const contract = await getWalletContract(scAddress)
  return contract.methods.sell_kit(amount, minAmount, deadLine).send()
}
