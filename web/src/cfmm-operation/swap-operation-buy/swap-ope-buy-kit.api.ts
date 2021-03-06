import { TransactionWalletOperation, WalletOperation } from '@taquito/taquito'
import { getSwapAddress, getSwapAllowance, getWalletContract, getWalletPKH, tezos } from '@wallet'

export type CfmmOpeBuyKitSubmitParams = {
  amount: number
  minExpected: number
  deadLine: Date
}

export const swapOpeBuySubmitRequest = async (
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
