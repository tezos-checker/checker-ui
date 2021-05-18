import { getMaxNumberValidator } from '@form'
import { isInvalidStorageBurrow, tzFormatter, TzFormatterType } from '@shared/utils'
import BigNumber from 'bignumber.js'
import { StorageRow } from 'src/storage/state/storage-state.type'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const tezToMint = 'tezToMint'

export const getBurrowOpeMintKitFormModel = (storage?: StorageRow): IFormInitalState => {
  const validators = []

  if (!isInvalidStorageBurrow(storage)) {
    const {
      burrow: { collateral },
    } = (storage as StorageRow).storage
    const outstandingKitMutez = tzFormatter(
      storage?.storage.burrow?.outstanding_kit || 0,
      TzFormatterType.tez_to_mutez,
    )

    const maxAmount = new BigNumber(collateral).plus(new BigNumber(outstandingKitMutez).negated())

    validators.push(getMaxNumberValidator(tzFormatter(maxAmount, TzFormatterType.mutez_to_tz)))
  }

  return {
    formInputs: {
      ...FormInputProperties.Builder(tezToMint).addValidators(validators).build(),
    },
    formValidators: [],
  } as IFormInitalState
}
