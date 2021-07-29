import { getSwapAddress } from '@checker'
import { getContract } from '@shared/utils'
import { TransactionWalletOperation } from '@taquito/taquito'

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
): Promise<TransactionWalletOperation> => {
  const contractz = await getContract(scAddress)
  const swapAddress = await getSwapAddress(contractz)

  //  const swapContract = await getContract(swapAddress)

  try {
    debugger
    const swapContract = await getContract(swapAddress)

    const swapStorage: any = await swapContract.storage()

    const balance = await swapStorage.tokens.get('tz1iTqjq1XtX1BVPP4YMiYJpbYM3HbmQxuGa')
    console.log(balance)

    const allowance = await swapStorage.allowances.get({
      owner: 'tz1SmKiGedS7x4hwGqeU2q4eUTy4zaJfJFC3',
      spender: 'KT1PPL3svzkumTQfq4aXm9LfPnocAMCYQN2w',
    })

    console.log(allowance)
  } catch (error) {
    console.log('error', error)
  }

  /*
  try {
    debugger
    const aaa = await tezos.contract.at('KT1DKZZbMyFeXmZJT729tWPxN5i1kChX8obw')
    const bbbb = await aaa.views.getBalance('tz1iTqjq1XtX1BVPP4YMiYJpbYM3HbmQxuGa').read()
    console.log(bbbb)
  } catch (error) {
    console.log('error', error)
  }
  */

  return contractz.methods.buy_kit(amount, minExpected, deadLine).send()
}
