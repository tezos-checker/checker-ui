import { SC_ADDRESS, tezos } from '@config'
import { TransactionWalletOperation } from '@taquito/taquito'

export const OpIncrementExecute = (valueIn = 0, amount = 0): Promise<TransactionWalletOperation> =>
  tezos.wallet
    // eslint-disable-next-line
    // @ts-ignore
    .transfer({
      to: SC_ADDRESS,
      parameter: {
        entrypoint: 'increment',
        value: {
          int: `${valueIn}`,
        },
      },
      amount,
    })
    .send()

export const OpIncrementWaitConfirmation = (
  op: TransactionWalletOperation,
  numberOfConfirmation = 1,
): Promise<any> => op.confirmation(numberOfConfirmation)
