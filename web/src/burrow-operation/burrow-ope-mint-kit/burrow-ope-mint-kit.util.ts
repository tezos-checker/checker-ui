import { tzFormatter, TzFormatterType } from '@shared/utils'
import BigNumber from 'bignumber.js'
import { BurrowStorage } from 'src/storage/state/storage-state.type'

export const getMaxAmountToMint = (burrowStoage: BurrowStorage) => {
  const { collateral, outstanding_kit: outstandingKit } = burrowStoage
  const outstandingKitMutez = tzFormatter(outstandingKit || 0, TzFormatterType.tez_to_mutez)

  const maxAmount = tzFormatter(
    new BigNumber(collateral).plus(new BigNumber(outstandingKitMutez).negated()),
    TzFormatterType.mutez_to_tz,
  )

  return maxAmount
}
