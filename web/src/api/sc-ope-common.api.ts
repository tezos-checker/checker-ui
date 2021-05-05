import { TransactionWalletOperation } from '@taquito/taquito'

export const scOpeConfirmation = (
  op: TransactionWalletOperation,
  numberOfConfirmation = 1,
): Promise<any> => op.confirmation(numberOfConfirmation)
