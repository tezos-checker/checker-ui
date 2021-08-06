import { getCheckerAvailableValues, getSmartContractAddressValidator } from '@form'
import { addDaysToCurrentDate } from '@shared/utils'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const ctezField = 'ctezField'
export const kitField = 'kit'
export const minTokensField = 'min_tokens'
export const deadLineField = 'deadLine'
export const checkerAdressField = 'checkerAdress'

export const getCfmmOpeAddLiquidityFormModel = (): IFormInitalState => {
  const validators = []

  return {
    formInputs: {
      ...FormInputProperties.Builder(checkerAdressField)
        .addAvailableValueList(getCheckerAvailableValues())
        .addValidators([getSmartContractAddressValidator()])
        .build(),
      ...FormInputProperties.Builder(ctezField).build(),
      ...FormInputProperties.Builder(kitField).build(),
      ...FormInputProperties.Builder(minTokensField).build(),
      ...FormInputProperties.Builder(deadLineField).addValue(addDaysToCurrentDate(1)).build(),
    },
    formValidators: [],
  } as IFormInitalState
}
