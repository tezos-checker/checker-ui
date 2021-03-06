import BigNumber from 'bignumber.js'
import { tezos } from '../config/wallet.config'

export enum TzFormatterType {
  mutez_to_tz = 'mutez_to_tz',
  tz_to_mutez = 'tz_to_mutez',
  mutez_to_mtz = 'mutez_to_mtz',
  mtz_to_mutez = 'mtz_to_mutez',
  mtz_to_tz = 'mtz_to_tz',
  tz_to_mtz = 'tz_to_mtz',
}

// tez = 'tz' - mutez = 'mutez' - mtz = 1000 mutez
const tzFormatterMap: {
  [key: string]: { from: 'mutez' | 'tz' | 'mtz'; to: 'mutez' | 'tz' | 'mtz' }
} = {
  [TzFormatterType.mutez_to_tz]: { from: 'mutez', to: 'tz' },
  [TzFormatterType.tz_to_mutez]: { from: 'tz', to: 'mutez' },
  [TzFormatterType.mutez_to_mtz]: { from: 'mutez', to: 'mtz' },
  [TzFormatterType.mtz_to_mutez]: { from: 'mtz', to: 'mutez' },
  [TzFormatterType.mtz_to_tz]: { from: 'mtz', to: 'tz' },
  [TzFormatterType.tz_to_mtz]: { from: 'tz', to: 'mtz' },
}

const tzFormatter = (
  amount: string | number | BigNumber,
  formatType: TzFormatterType,
): BigNumber => {
  const bigNum = new BigNumber(amount)
  if (bigNum.isNaN()) {
    throw Error(`Tezos amount ${amount} is not an number`)
  }
  const { from, to } = tzFormatterMap[formatType]
  return new BigNumber(`${tezos.format(from, to, amount)}`)
}

export const TzFormatMutezToTz = (amount: string | number | BigNumber) =>
  tzFormatter(amount, TzFormatterType.mutez_to_tz)

export const TzFormatTzToMutez = (amount: string | number | BigNumber) =>
  tzFormatter(amount, TzFormatterType.tz_to_mutez)

export const TzFormatMutezToMtz = (amount: string | number | BigNumber) =>
  tzFormatter(amount, TzFormatterType.mutez_to_mtz)

export const TzFormatMtzToMutez = (amount: string | number | BigNumber) =>
  tzFormatter(amount, TzFormatterType.mtz_to_mutez)

export const TzFormatMtzToTz = (amount: string | number | BigNumber) =>
  tzFormatter(amount, TzFormatterType.mtz_to_tz)

export const TzFormatTzToMtz = (amount: string | number | BigNumber) =>
  tzFormatter(amount, TzFormatterType.tz_to_mtz)
