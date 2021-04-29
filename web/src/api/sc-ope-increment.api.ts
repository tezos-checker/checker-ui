import { tezos } from '@config'
import { TransactionWalletOperation } from '@taquito/taquito'

export const scOpeIncrementTransfert = (
  value = 0,
  amount = 0,
): Promise<TransactionWalletOperation> =>
  tezos.smartContract.methods.increment(value).send({ amount })
