import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const tezToMint = 'tezToMint'

export const burrowOpeMintFormModel = {
  formInputs: {
    ...FormInputProperties.Builder(tezToMint).build(),
  },
  formValidators: [],
} as IFormInitalState
