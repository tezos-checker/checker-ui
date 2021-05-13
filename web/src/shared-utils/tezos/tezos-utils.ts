import { tezos } from '@config'

export const getContract = (scAddress: string) => tezos.wallet.at(scAddress)
