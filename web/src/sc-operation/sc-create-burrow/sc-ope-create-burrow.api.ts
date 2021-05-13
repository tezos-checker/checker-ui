import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type ScOpeCreateBurrowSubmitParams = { bidon: boolean }

export const scOpeCreateBurrowSubmit = async ({
  bidon,
}: ScOpeCreateBurrowSubmitParams): Promise<TransactionWalletOperation> => {
  const contract = await getContract()
  // eslint-disable-next-line
  debugger
  return contract.methods.create_burrow(2).send({ amount: 100 })
}
