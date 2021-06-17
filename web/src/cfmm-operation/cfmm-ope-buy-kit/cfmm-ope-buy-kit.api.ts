import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type CfmmOpeBuyKitSubmitParams = {
  amount: number
  minAmount: number
  deadLine: Date
}

export const cfmmOpeBuyKitSubmitRequest = async (
  scAddress: string,
  amount: number,
  minAmount: number,
  deadLine: Date,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  return contract.methods.buy_kit(amount, minAmount, deadLine).send()
}
