import { TransactionWalletOperation } from '@taquito/taquito'
import { getWalletContract } from '@wallet'

export const burrowOpeBurnKitSubmitRequest = async (
  scAddress: string,
  burrowId: number,
  amount: number,
): Promise<TransactionWalletOperation> => {
  const contract = await getWalletContract(scAddress)
  return contract.methods.burn_kit(burrowId, amount).send()
}
