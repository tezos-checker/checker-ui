import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export type BurrowOpeCreateBurrowSubmitParams = {
  delegate: string
  deposit: number
}

export const burrowOpeCreateBurrowSubmit = async (
  burrowId: number,
  scAddress: string,
  { delegate, deposit }: BurrowOpeCreateBurrowSubmitParams,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  return contract.methods.create_burrow(burrowId).send({ amount: deposit })
}
