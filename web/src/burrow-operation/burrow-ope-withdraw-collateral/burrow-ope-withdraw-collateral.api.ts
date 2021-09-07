import { TransactionWalletOperation } from '@taquito/taquito'
import { getWalletContract } from '@wallet'

export const burrowOpeWithdrawCollateralSubmitRequest = async (
  scAddress: string,
  burrowId: number,
  amount: number,
): Promise<TransactionWalletOperation> => {
  const contract = await getWalletContract(scAddress)
  return contract.methods.withdraw_collateral(amount, burrowId).send()
}
