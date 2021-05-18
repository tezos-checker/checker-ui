import { tezos } from '@config'
import { errorToast } from '@shared/ui'
import BigNumber from 'bignumber.js'

export enum TzFormatterType {
  mutez_to_tz = 'mutez_to_tz',
  tez_to_mutez = 'tez_to_mutez',
  mutez_to_mtz = 'mutez_to_mtz',
  mtz_to_mutez = 'mtz_to_mutez',
  mtz_to_tz = 'mtz_to_tz',
  tz_to_mtz = 'tz_to_mtz',
}

const tzFormatterMap: {
  [key: string]: { from: 'mutez' | 'tz' | 'mtz'; to: 'mutez' | 'tz' | 'mtz' }
} = {
  [TzFormatterType.mutez_to_tz]: { from: 'mutez', to: 'tz' },
  [TzFormatterType.tez_to_mutez]: { from: 'tz', to: 'mutez' },
  [TzFormatterType.mutez_to_mtz]: { from: 'mutez', to: 'mtz' },
  [TzFormatterType.mtz_to_mutez]: { from: 'mtz', to: 'mutez' },
  [TzFormatterType.mtz_to_tz]: { from: 'mtz', to: 'tz' },
  [TzFormatterType.tz_to_mtz]: { from: 'tz', to: 'mtz' },
}

export const tzFormatter = (
  amount: string | number | BigNumber,
  formatType: TzFormatterType,
): BigNumber => {
  const bigNum = new BigNumber(amount)
  if (bigNum.isNaN()) {
    errorToast('Tezos amount', `${amount} is not an number`)
    return new BigNumber(0)
  }
  const { from, to } = tzFormatterMap[formatType]
  return new BigNumber(`${tezos.format(from, to, amount)}`)
}

export const getContract = (scAddress: string) => tezos.wallet.at(scAddress)

//  return `${tezos.format('mutez', 'tz', amount)} ꜩ`
//  return `${tezos.format('mutez', 'mtz', amount)} mꜩ`
