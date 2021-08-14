import { TransactionWalletOperation } from '@taquito/taquito'
import { getWalletContract } from '@wallet'

export const burrowOpeDepositCollateralSubmitRequest = async (
  scAddress: string,
  burrowId: number,
  amount: number,
): Promise<TransactionWalletOperation> => {
  const contract = await getWalletContract(scAddress)
  return contract.methods.deposit_collateral(burrowId).send({ amount })
}
