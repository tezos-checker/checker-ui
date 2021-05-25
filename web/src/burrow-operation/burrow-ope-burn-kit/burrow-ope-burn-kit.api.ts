import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export const burrowOpeBurnKitSubmitRequest = async (
  scAddress: string,
  burrowId: number,
  amount: number,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  return contract.methods.burn_kit(burrowId, amount).send()
}
