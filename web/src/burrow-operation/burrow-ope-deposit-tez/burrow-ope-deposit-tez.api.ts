import { getWalletContract } from '@config'
import { TransactionWalletOperation } from '@taquito/taquito'

export const burrowOpeDepositTezSubmitRequest = async (
  scAddress: string,
  burrowId: number,
  amount: number,
): Promise<TransactionWalletOperation> => {
  const contract = await getWalletContract(scAddress)
  return contract.methods.deposit_tez(burrowId).send({ amount })
}
