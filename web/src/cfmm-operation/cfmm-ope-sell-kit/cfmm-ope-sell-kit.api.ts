import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type CfmmOpeSellKitSubmitParams = {
  amount: number
  minAmount: number
  deadLine: Date
}

export const cfmmOpeSellKitSubmitRequest = async (
  scAddress: string,
  amount: number,
  minAmount: number,
  deadLine: Date,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  return contract.methods.sell_kit(amount, minAmount, deadLine).send()
}
