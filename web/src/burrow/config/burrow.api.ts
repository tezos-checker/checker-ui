import { getContract } from '@config'
import { TransactionWalletOperation } from '@taquito/taquito'

export const scCreateBurrow = async (): Promise<TransactionWalletOperation> => {
  const contract = await getContract()
  return contract.methods.createBurrow(1, 'None').send({ amount: 100 })
}
