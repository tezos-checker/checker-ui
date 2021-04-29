import { tezos } from '@config'
import { TransactionWalletOperation } from '@taquito/taquito'

export const scOpeIncrementTransfert = async (
  value = 0,
  amount = 0,
): Promise<TransactionWalletOperation> => {
  const sc = tezos.smartContract
  return sc.methods.increment(value).send({ amount })
}
