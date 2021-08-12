import { getMinNumberValidator } from '@form'
import { TzFormatMutezToTz } from '@wallet'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

// fixme rename variables
export const amount = 'amount'
export const minCtez = 'minCtez'
export const minKit = 'minKit'
export const deadLine = 'deadLine'

export const getMinOneMutezValidator = () => getMinNumberValidator(TzFormatMutezToTz(1))

export const getCfmmOpeRemoveLiquidityFormModel = (): IFormInitalState =>
  ({
    formInputs: {
      ...FormInputProperties.Builder(amount).addValidators([getMinOneMutezValidator()]).build(),
      ...FormInputProperties.Builder(minCtez).addValidators([getMinOneMutezValidator()]).build(),
      ...FormInputProperties.Builder(minKit).addValidators([getMinOneMutezValidator()]).build(),
      ...FormInputProperties.Builder(deadLine).addValue(20).build(),
    },
    formValidators: [],
  } as IFormInitalState)
