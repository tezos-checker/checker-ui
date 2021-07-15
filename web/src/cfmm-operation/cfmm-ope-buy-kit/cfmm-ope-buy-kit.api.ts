import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type CfmmOpeBuyKitSubmitParams = {
  amount: number
  minExpected: number
  deadLine: Date
}

export const cfmmOpeBuyKitSubmitRequest = async (
  scAddress: string,
  amount: number,
  minExpected: number,
  deadLine: Date,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  return contract.methods.buy_kit(amount, minExpected, deadLine).send()
}
