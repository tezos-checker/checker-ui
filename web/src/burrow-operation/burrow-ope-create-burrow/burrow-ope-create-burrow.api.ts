import { TransactionWalletOperation } from '@taquito/taquito'
import { getWalletContract } from '@wallet'

export type BurrowOpeCreateBurrowSubmitParams = {
  delegate: string
  deposit: number
}

export const burrowOpeCreateBurrowSubmitRequest = async (
  burrowId: number,
  scAddress: string,
  { delegate, deposit }: BurrowOpeCreateBurrowSubmitParams,
): Promise<TransactionWalletOperation> => {
  const contract = await getWalletContract(scAddress)
  return contract.methods.create_burrow(burrowId).send({ amount: deposit })
}
