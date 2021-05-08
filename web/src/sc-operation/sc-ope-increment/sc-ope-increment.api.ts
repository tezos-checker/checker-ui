import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type ScOperationIncrementSubmitParams = {
  amount: number
  value: number
}

export const scOpeIncrementSubmit = async ({
  value,
  amount,
}: ScOperationIncrementSubmitParams): Promise<TransactionWalletOperation> => {
  const contract = await getContract()
  return contract.methods.increment(value).send({ amount })
}
