import { getMinNumberValidator } from '@form'
import { TzFormatMutezToTz } from '@wallet'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const amount = 'amount'
export const maxExpected = 'maxExpected'
export const minToken = 'minToken'
export const deadLine = 'deadLine'

export const getMinOneMutezValidator = () => getMinNumberValidator(TzFormatMutezToTz(1))

export const getCfmmOpeAddLiquidityFormModel = (): IFormInitalState =>
  ({
    formInputs: {
      ...FormInputProperties.Builder(amount).addValidators([getMinOneMutezValidator()]).build(),
      ...FormInputProperties.Builder(maxExpected)
        .addValidators([getMinOneMutezValidator()])
        .build(),
      ...FormInputProperties.Builder(minToken).addValidators([getMinOneMutezValidator()]).build(),
      ...FormInputProperties.Builder(deadLine).addValue(20).build(),
    },
    formValidators: [],
  } as IFormInitalState)
