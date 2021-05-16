import { tezos } from '@config'
import BigNumber from 'bignumber.js'

export const getContract = (scAddress: string) => tezos.wallet.at(scAddress)

export const tzFormatter = (amount: string | number | BigNumber, format: string): string => {
  const bigNum = new BigNumber(amount)
  if (bigNum.isNaN()) {
    return amount as string
  }

  if (format === 'tz') {
    return `${tezos.format('mutez', 'tz', amount)} ꜩ`
  }
  if (format === 'mtz') {
    return `${tezos.format('mutez', 'mtz', amount)} mꜩ`
  }
  return bigNum.toString()
}
