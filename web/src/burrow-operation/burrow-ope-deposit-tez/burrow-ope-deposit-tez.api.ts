import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type BurrowOpeDepositTezSubmitParams = { tez: number; burrowId: number }

export const burrowOpeDepositTezSubmitRequest = async (
  scAddress: string,
  burrowId: number,
  amount: number,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  return contract.methods.deposit_tez(burrowId).send({ amount })
}
