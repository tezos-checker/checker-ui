import { TzFormatMutezToTz, TzFormatTzToMutez } from '@config'
import BigNumber from 'bignumber.js'
import { BurrowStorage } from 'src/storage/state/storage-state.type'

export const getMaxAmountToMint = (burrowStoage: BurrowStorage) => {
  const { collateral, outstanding_kit: outstandingKit } = burrowStoage
  const outstandingKitMutez = TzFormatTzToMutez(outstandingKit || 0)

  const maxAmount = TzFormatMutezToTz(
    new BigNumber(collateral).plus(new BigNumber(outstandingKitMutez).negated()),
  )

  return maxAmount
}
