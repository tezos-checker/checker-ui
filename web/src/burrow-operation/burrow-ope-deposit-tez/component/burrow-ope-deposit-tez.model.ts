import { getMinNumberValidator } from '@form'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const inputDeposit = 'deposit'

export const burrowOpeDepositTezFormModel = {
  formInputs: {
    ...FormInputProperties.Builder(inputDeposit)
      .addValidators([getMinNumberValidator(1)])
      .build(),
  },
  formValidators: [],
} as IFormInitalState
