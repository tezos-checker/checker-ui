import { getMinNumberValidator } from '@form'
import BigNumber from 'bignumber.js'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const inputChecker = 'checker'
export const inputDelegate = 'delegate'
export const inputDeposit = 'deposit'

export const createBurrowFormModel = (address: string) =>
  ({
    formInputs: {
      ...FormInputProperties.Builder(inputChecker).addValue(address).build(),
      ...FormInputProperties.Builder(inputDelegate).build(),
      ...FormInputProperties.Builder(inputDeposit)
        .addValidators([getMinNumberValidator(new BigNumber(1))])
        .build(),
    },
    formValidators: [],
  } as IFormInitalState)
