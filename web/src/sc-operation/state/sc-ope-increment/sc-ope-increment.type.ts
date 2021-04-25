import { TransactionWalletOperation } from '@taquito/taquito'

export type ScOpeParamsIncrementTransfert = {
  value: number
  nbConfirmation: number
}

export type ScOpeParamsIncrementConfirmation = {
  operation: TransactionWalletOperation
  nbConfirmation: number
}
