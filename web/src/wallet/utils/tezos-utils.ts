import { tzip16 } from '@taquito/tzip16'
import { tezos } from '../config/wallet.config'

// eslint-disable-next-line
// @ts-ignore
export const getWalletContract = (scAddress: string) => tezos.wallet.at(scAddress, tzip16)
