import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type ScOpeDepositTezSubmitParams = { tez: number }

export const scOpeDepositTezSubmit = async ({
  tez,
}: ScOpeDepositTezSubmitParams): Promise<TransactionWalletOperation> => {
  const contract = await getContract()
  // eslint-disable-next-line
  debugger
  return contract.methods.deposit_tez(tez).send()
}
