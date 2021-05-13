import { getContract } from '@config'
import { TransactionWalletOperation } from '@taquito/taquito'

export const scCreateBurrow = async (scAddress: string): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  return contract.methods.createBurrow(1).send({ amount: 100 })
}
