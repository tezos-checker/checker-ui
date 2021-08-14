import { getMinNumberValidator } from '@form'
import BigNumber from 'bignumber.js'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const inputDeposit = 'deposit'

export const burrowOpeDepositCollateralFormModel = {
  formInputs: {
    ...FormInputProperties.Builder(inputDeposit)
      .addValidators([getMinNumberValidator(new BigNumber(1))])
      .build(),
  },
  formValidators: [],
} as IFormInitalState
