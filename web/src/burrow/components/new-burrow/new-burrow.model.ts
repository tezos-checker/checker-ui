import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const inputChecker = 'checker'
export const inputDelegate = 'delegate'
export const inputDeposit = 'deposit'

export const burrowFormModel = {
  formInputs: {
    ...FormInputProperties.Builder(inputChecker)
      .addAvailableValue({
        value: 'KT1MuXVJMwW6Dra1g9FZBdpDmk6KANResXD4',
        label: 'KT1MuXVJMwW6Dra1g9FZBdpDmk6KANResXD4',
      })
      .build(),
    ...FormInputProperties.Builder(inputDelegate).build(),
    ...FormInputProperties.Builder(inputDeposit).build(),
  },
  formValidators: [],
} as IFormInitalState
