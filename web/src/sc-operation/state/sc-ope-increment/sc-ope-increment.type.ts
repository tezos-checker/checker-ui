import { TransactionWalletOperation } from '@taquito/taquito'

export type OpeParams_Increment_Transfert = {
  value: number
  nbConfirmation: number
}

export type OpeParams_Increment_Confirmation = {
  operation: TransactionWalletOperation
  nbConfirmation: number
}
