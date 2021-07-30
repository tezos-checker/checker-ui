import { getWalletContract } from '@config'
import { TransactionWalletOperation } from '@taquito/taquito'

export type BurrowOpeCreateBurrowSubmitParams = {
  delegate: string
  deposit: number
}

export const burrowOpeCreateBurrowSubmitRequest = async (
  burrowId: number,
  scAddress: string,
  { delegate, deposit }: BurrowOpeCreateBurrowSubmitParams,
): Promise<TransactionWalletOperation> => {
  debugger
  const contract = await getWalletContract(scAddress)
  return contract.methods.create_burrow(burrowId).send({ amount: deposit })
}
