import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type ScOpeCreateBurrowSubmitParams = {
  scAddress: string
  delegate: string
  deposit: number
}

export const scOpeCreateBurrowSubmit = async (
  burrowId: string,
  { scAddress, delegate, deposit }: ScOpeCreateBurrowSubmitParams,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  // eslint-disable-next-line
  debugger
  return contract.methods.create_burrow(burrowId).send({ amount: deposit })
}
