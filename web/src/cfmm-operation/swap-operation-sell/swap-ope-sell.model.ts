import { getMinNumberValidator } from '@form'
import { TzFormatMutezToTz } from '@wallet'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const sellFrom = 'sellFrom'
export const sellTo = 'sellTo'
export const deadLine = 'deadLine'
export const slippage = 'slippage'

export const getMinOneMutezValidator = () => getMinNumberValidator(TzFormatMutezToTz(1))

export const getSwapOpeSellFormModel = (): IFormInitalState =>
  ({
    formInputs: {
      ...FormInputProperties.Builder(sellFrom).addValidators([getMinOneMutezValidator()]).build(),
      ...FormInputProperties.Builder(sellTo).addValidators([getMinOneMutezValidator()]).build(),
      ...FormInputProperties.Builder(deadLine).addValue(20).build(),
      ...FormInputProperties.Builder(slippage).addValue(0.01).build(),
    },
    formValidators: [],
  } as IFormInitalState)
