import { addDaysToCurrentDate } from '@shared/utils'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const amount = 'amount'
export const minAmount = 'minAmount'
export const deadLine = 'deadLine'

export const getCfmmOpeBuyKitFormModel = (): IFormInitalState => {
  const validators = []

  return {
    formInputs: {
      ...FormInputProperties.Builder(amount).build(),
      ...FormInputProperties.Builder(minAmount).build(),
      ...FormInputProperties.Builder(deadLine).addValue(addDaysToCurrentDate(1)).build(),
    },
    formValidators: [],
  } as IFormInitalState
}
