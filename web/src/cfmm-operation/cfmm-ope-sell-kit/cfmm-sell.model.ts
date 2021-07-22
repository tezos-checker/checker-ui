import { TzFormatMutezToTz } from '@config'
import { getMinNumberValidator } from '@form'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const sellFrom = 'sellFrom'
export const sellTo = 'sellTo'
export const deadLine = 'deadLine'
export const slippage = 'slippage'

export const getMinOneMutezValidator = () => getMinNumberValidator(TzFormatMutezToTz(1))

export const getCfmmOpeBuyKitFormModel = (): IFormInitalState =>
  ({
    formInputs: {
      ...FormInputProperties.Builder(sellFrom).addValidators([getMinOneMutezValidator()]).build(),
      ...FormInputProperties.Builder(sellTo)
        .addValidators([getMinOneMutezValidator()])
        .addValue('0')
        .build(),
      ...FormInputProperties.Builder(deadLine).addValue(20).build(),
      ...FormInputProperties.Builder(slippage).addValue(0.01).build(),
    },
    formValidators: [],
  } as IFormInitalState)
