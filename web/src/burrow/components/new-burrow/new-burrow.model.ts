import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const inputChecker = 'checker'
export const inputDelegate = 'delegate'
export const inputDeposit = 'deposit'

export const burrowFormModel = {
  formInputs: {
    ...FormInputProperties.Builder(inputChecker)
      .addAvailableValue({
        value: 'KT19BUeLeqaX5qqnq3XajCpXruyJ77aUPs74',
        label: 'KT19BUeLeqaX5qqnq3XajCpXruyJ77aUPs74',
      })
      .build(),
    ...FormInputProperties.Builder(inputDelegate).build(),
    ...FormInputProperties.Builder(inputDeposit).build(),
  },
  formValidators: [],
} as IFormInitalState
