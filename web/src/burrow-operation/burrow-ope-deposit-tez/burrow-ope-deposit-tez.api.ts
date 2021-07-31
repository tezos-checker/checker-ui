import { TransactionWalletOperation } from '@taquito/taquito'
import { getWalletContract } from '@wallet'

export const burrowOpeDepositTezSubmitRequest = async (
  scAddress: string,
  burrowId: number,
  amount: number,
): Promise<TransactionWalletOperation> => {
  const contract = await getWalletContract(scAddress)
  return contract.methods.deposit_tez(burrowId).send({ amount })
}
