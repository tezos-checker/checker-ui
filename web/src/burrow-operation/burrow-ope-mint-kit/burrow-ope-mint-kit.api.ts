import { TransactionWalletOperation } from '@taquito/taquito'
import { getWalletContract, TzFormatTzToMutez } from '@wallet'

export const burrowOpeMintKitSubmitRequest = async (
  scAddress: string,
  burrowId: number,
  amount: number,
): Promise<TransactionWalletOperation> => {
  const contract = await getWalletContract(scAddress)
  return contract.methods.mint_kit(burrowId, TzFormatTzToMutez(amount)).send()
}
