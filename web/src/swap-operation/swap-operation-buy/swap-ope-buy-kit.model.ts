import { getMinNumberValidator } from '@form'
import { TzFormatMutezToTz } from '@wallet'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const amount = 'amount'
export const minExpected = 'minExpected'
export const deadLine = 'deadLine'
export const slippage = 'slippage'

export const getMinOneMutezValidator = () => getMinNumberValidator(TzFormatMutezToTz(1))

export const getSwapOpeBuyFormModel = (): IFormInitalState =>
  ({
    formInputs: {
      ...FormInputProperties.Builder(amount).addValidators([getMinOneMutezValidator()]).build(),
      ...FormInputProperties.Builder(minExpected)
        .addValidators([getMinOneMutezValidator()])
        .addValue('0')
        .build(),
      ...FormInputProperties.Builder(deadLine).addValue(20).build(),
      ...FormInputProperties.Builder(slippage).addValue(0.01).build(),
    },
    formValidators: [],
  } as IFormInitalState)
