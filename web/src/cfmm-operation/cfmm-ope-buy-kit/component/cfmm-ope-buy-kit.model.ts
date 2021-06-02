import { getSmartContractAddressValidator } from '@form'
import { addDaysToCurrentDate } from '@shared/utils'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const amount = 'amount'
export const minAmount = 'minAmount'
export const deadLine = 'deadLine'
export const checkerAdress = 'checkerAdress'

export const getCfmmOpeBuyKitFormModel = (): IFormInitalState => {
  const validators = []

  return {
    formInputs: {
      ...FormInputProperties.Builder(checkerAdress)
        .addAvailableValue({
          value: 'KT1RcMG4wUJapxbfkgNkTEgi3pg24vHbADqo',
          label: 'KT1RcMG4wUJapxbfkgNkTEgi3pg24vHbADqo',
        })
        .addValidators([getSmartContractAddressValidator()])
        .build(),
      ...FormInputProperties.Builder(amount).build(),
      ...FormInputProperties.Builder(minAmount).build(),
      ...FormInputProperties.Builder(deadLine).addValue(addDaysToCurrentDate(1)).build(),
    },
    formValidators: [],
  } as IFormInitalState
}
