import { SC_ADDRESS, tezos } from '@config'

export const getContract = () => tezos.wallet.at(SC_ADDRESS)
