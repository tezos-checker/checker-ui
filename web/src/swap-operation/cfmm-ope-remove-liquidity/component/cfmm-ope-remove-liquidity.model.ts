import { getCheckerAvailableValues, getSmartContractAddressValidator } from '@form'
import { addDaysToCurrentDate } from '@shared/utils'
import { FormInputProperties, IFormInitalState } from 'vdr-react-form-manager'

export const tokenField = 'token'
export const minTezField = 'minTez'
export const minKitField = 'minKit'
export const deadLineField = 'deadline'
export const checkerAdressField = 'checkerAdress'

export const getCfmmOpeRemoveLiquidityFormModel = (): IFormInitalState => {
  const validators = []

  return {
    formInputs: {
      ...FormInputProperties.Builder(checkerAdressField)
        .addAvailableValueList(getCheckerAvailableValues())
        .addValidators([getSmartContractAddressValidator()])
        .build(),
      ...FormInputProperties.Builder(tokenField).build(),
      ...FormInputProperties.Builder(minTezField).build(),
      ...FormInputProperties.Builder(minKitField).build(),
      ...FormInputProperties.Builder(deadLineField).addValue(addDaysToCurrentDate(1)).build(),
    },
    formValidators: [],
  } as IFormInitalState
}
