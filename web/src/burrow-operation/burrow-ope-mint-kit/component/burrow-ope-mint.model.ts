import { getMaxNumberValidator } from '@form'
import BigNumber from 'bignumber.js'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const tezToMint = 'tezToMint'

export const getBurrowOpeMintKitFormModel = (maxAmount: BigNumber): IFormInitalState => {
  const validators = [getMaxNumberValidator(maxAmount)]

  return {
    formInputs: {
      ...FormInputProperties.Builder(tezToMint).addValidators(validators).build(),
    },
    formValidators: [],
  } as IFormInitalState
}
