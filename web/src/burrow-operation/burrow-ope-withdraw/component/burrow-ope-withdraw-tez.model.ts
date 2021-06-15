import { getMinNumberValidator } from '@form'
import BigNumber from 'bignumber.js'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const inputWithdraw = 'withdraw'

export const burrowOpeWithdrawTezFormModel = {
  formInputs: {
    ...FormInputProperties.Builder(inputWithdraw)
      .addValidators([getMinNumberValidator(new BigNumber(1))])
      .build(),
  },
  formValidators: [],
} as IFormInitalState
