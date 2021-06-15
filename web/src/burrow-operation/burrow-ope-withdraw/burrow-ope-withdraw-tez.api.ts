import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export const burrowOpeWithdrawTezSubmitRequest = async (
  scAddress: string,
  burrowId: number,
  amount: number,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  return contract.methods.withdraw_tez(burrowId).send({ amount })
}
