import { checkerAdresses } from '@config'
import { IFormInputAvailableValue } from 'vdr-react-form-manager'

export const getCheckerAvailableValues = (): IFormInputAvailableValue[] =>
  checkerAdresses.map((x) => ({
    value: x,
    label: x,
  }))
