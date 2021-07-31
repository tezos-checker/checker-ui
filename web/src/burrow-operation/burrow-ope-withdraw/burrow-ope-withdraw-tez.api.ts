import { TransactionWalletOperation } from '@taquito/taquito'
import { getWalletContract } from '@wallet'

export const burrowOpeWithdrawTezSubmitRequest = async (
  scAddress: string,
  burrowId: number,
  amount: number,
): Promise<TransactionWalletOperation> => {
  const contract = await getWalletContract(scAddress)
  return contract.methods.withdraw_tez(amount, burrowId).send()
}
