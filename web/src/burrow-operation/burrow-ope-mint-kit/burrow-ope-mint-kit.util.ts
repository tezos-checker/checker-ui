import { tzFormatter, TzFormatterType } from '@shared/utils'
import BigNumber from 'bignumber.js'
import { StorageRow } from 'src/storage/state/storage-state.type'

export const getMintAmounts = (storage: StorageRow) => {
  const {
    burrow: { collateral },
  } = (storage as StorageRow).storage
  const outstandingKitMutez = tzFormatter(
    storage?.storage.burrow?.outstanding_kit || 0,
    TzFormatterType.tez_to_mutez,
  )

  const maxAmount = tzFormatter(
    new BigNumber(collateral).plus(new BigNumber(outstandingKitMutez).negated()),
    TzFormatterType.mutez_to_tz,
  )

  return { collateral, outstandingKitMutez, maxAmount }
}
