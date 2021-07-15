import { TzFormatMutezToTz } from '@config'
import { getMinNumberValidator } from '@form'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const amount = 'amount'
export const minAmount = 'minAmount'
export const deadLine = 'deadLine'
export const checkerAdress = 'checkerAdress'

export const getMinOneMutezValidator = () => getMinNumberValidator(TzFormatMutezToTz(1))

export const getCfmmOpeBuyKitFormModel = (): IFormInitalState =>
  ({
    formInputs: {
      ...FormInputProperties.Builder(amount).addValidators([getMinOneMutezValidator()]).build(),
      ...FormInputProperties.Builder(minAmount)
        .addValidators([getMinOneMutezValidator()])
        .addValue('0')
        .build(),
    },
    formValidators: [],
  } as IFormInitalState)
