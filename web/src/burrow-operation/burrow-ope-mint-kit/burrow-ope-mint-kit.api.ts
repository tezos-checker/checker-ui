import { tezos } from '@config'
import { getContract, TzFormatTzToMutez } from '@shared/utils'
import { TransactionWalletOperation, WalletOperation } from '@taquito/taquito'

export const burrowOpeMintKitSubmitRequest = async (
  scAddress: string,
  burrowId: number,
  amount: number,
): Promise<TransactionWalletOperation | WalletOperation> => {
  const contract = await getContract(scAddress)

  const batch = tezos.wallet
    .batch()
    .withContractCall(contract.methods.withdraw_tez(1, burrowId))
    .withContractCall(contract.methods.mint_kit(burrowId, TzFormatTzToMutez(amount)))

  return batch.send()
}
