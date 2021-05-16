import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'
import { getCheckerAddressValidator } from './create-burrow-form-validators'

export const inputChecker = 'checker'
export const inputDelegate = 'delegate'
export const inputDeposit = 'deposit'

export const createBurrowFormModel = {
  formInputs: {
    ...FormInputProperties.Builder(inputChecker)
      .addAvailableValue({
        value: 'KT19BUeLeqaX5qqnq3XajCpXruyJ77aUPs74',
        label: 'KT19BUeLeqaX5qqnq3XajCpXruyJ77aUPs74',
      })
      .addValidators([getCheckerAddressValidator()])

      .build(),
    ...FormInputProperties.Builder(inputDelegate).build(),
    ...FormInputProperties.Builder(inputDeposit).build(),
  },
  formValidators: [],
} as IFormInitalState
