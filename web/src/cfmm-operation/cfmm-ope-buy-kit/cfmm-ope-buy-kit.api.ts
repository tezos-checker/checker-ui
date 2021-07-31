import { getSwapAddress } from '@checker'
import { getWalletPKH } from '@shared/utils'
import { TransactionWalletOperation, WalletOperation } from '@taquito/taquito'
import { getSwapAllowance, getWalletContract, tezos } from '@wallet'

export type CfmmOpeBuyKitSubmitParams = {
  amount: number
  minExpected: number
  deadLine: Date
}

export const cfmmOpeBuyKitSubmitRequest = async (
  scAddress: string,
  amount: number,
  minExpected: number,
  deadLine: Date,
): Promise<TransactionWalletOperation | WalletOperation> => {
  const checkerContract = await getWalletContract(scAddress)
  const swapAddress = await getSwapAddress(checkerContract)
  const walletPKH = await getWalletPKH()

  const allowance = await getSwapAllowance(swapAddress, scAddress, walletPKH)

  if (allowance.isLessThan(amount)) {
    const swapContract = await getWalletContract(swapAddress)

    const batch = tezos.wallet
      .batch()
      .withContractCall(swapContract.methods.approve(scAddress, amount))
      .withContractCall(checkerContract.methods.buy_kit(amount, minExpected, deadLine))

    return batch.send()
  }

  return checkerContract.methods.buy_kit(amount, minExpected, deadLine).send()
}
