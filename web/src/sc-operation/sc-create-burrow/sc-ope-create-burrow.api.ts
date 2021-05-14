import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type ScOpeCreateBurrowSubmitParams = {
  delegate: string
  deposit: number
}

export const scOpeCreateBurrowSubmit = async (
  burrowId: number,
  scAddress: string,
  { delegate, deposit }: ScOpeCreateBurrowSubmitParams,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  // eslint-disable-next-line
  debugger
  return contract.methods.create_burrow(burrowId).send({ amount: deposit })
}
