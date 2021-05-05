import { getContract } from '@config'
import { TransactionWalletOperation } from '@taquito/taquito'

export const scOpeIncrementSubmit = async (
  value = 0,
  amount = 0,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract()
  return contract.methods.increment(value).send({ amount })
}
