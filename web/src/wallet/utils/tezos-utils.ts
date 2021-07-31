import { tezos } from '@config'
import { tzip16 } from '@taquito/tzip16'

// eslint-disable-next-line
// @ts-ignore
export const getWalletContract = (scAddress: string) => tezos.wallet.at(scAddress, tzip16)
