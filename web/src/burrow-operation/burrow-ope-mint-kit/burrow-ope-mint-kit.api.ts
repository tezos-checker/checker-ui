import { BurrowOpeAmountSubmitParams } from '@burrow-operation'
import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

export const burrowOpeMintKitSubmitRequest = async (
  scAddress: string,
  { burrowId, amount }: BurrowOpeAmountSubmitParams,
): Promise<TransactionWalletOperation> => {
  const contract = await getContract(scAddress)
  return contract.methods.mint_kit(burrowId, amount).send()
}
