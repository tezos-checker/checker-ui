import { getMaxNumberValidator, getMinNumberValidator } from '@form'
import BigNumber from 'bignumber.js'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const amoutToBurn = 'amoutToBurn'

export const getBurrowOpeBurnKitFormModel = (maxAmount: BigNumber): IFormInitalState => {
  const validators = [getMinNumberValidator(new BigNumber(0)), getMaxNumberValidator(maxAmount)]

  return {
    formInputs: {
      ...FormInputProperties.Builder(amoutToBurn).addValidators(validators).build(),
    },
    formValidators: [],
  } as IFormInitalState
}
