import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const tezToMint = 'tezToMint'

export const getBurrowOpeMintKitFormModel = (): IFormInitalState =>
  ({
    formInputs: {
      ...FormInputProperties.Builder(tezToMint).build(),
    },
    formValidators: [],
  } as IFormInitalState)
