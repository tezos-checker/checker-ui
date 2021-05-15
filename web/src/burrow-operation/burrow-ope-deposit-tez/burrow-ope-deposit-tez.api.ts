import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type BurrowOpeDepositTezSubmitParams = { tez: number }

export const burrowOpeDepositTezSubmitRequest = async (
  scAddress: string,
  { tez }: BurrowOpeDepositTezSubmitParams,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  return contract.methods.deposit_tez(tez).send()
}
