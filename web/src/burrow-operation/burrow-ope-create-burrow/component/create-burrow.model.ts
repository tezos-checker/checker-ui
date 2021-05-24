import { getMinNumberValidator, getSmartContractAddressValidator } from '@form'
import BigNumber from 'bignumber.js'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

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
      .addValidators([getSmartContractAddressValidator()])

      .build(),
    ...FormInputProperties.Builder(inputDelegate).build(),
    ...FormInputProperties.Builder(inputDeposit)
      .addValidators([getMinNumberValidator(new BigNumber(1))])
      .build(),
  },
  formValidators: [],
} as IFormInitalState
