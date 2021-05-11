import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type ScOpeCreateBurrowSubmitParams = {}

export const scOpeCreateBurrowSubmit = async ({}: ScOpeCreateBurrowSubmitParams): Promise<TransactionWalletOperation> => {
  const contract = await getContract()
  return contract.methods.create_burrow(1, 'None').send({ amount: 100 })
}
