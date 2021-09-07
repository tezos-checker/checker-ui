import { appNetwork } from '@wallet'
import { IFormInputAvailableValue } from 'vdr-react-form-manager'

export const getCheckerAvailableValues = (): IFormInputAvailableValue[] =>
  appNetwork.checkers.map((x) => ({
    value: x.address,
    label: x.address,
  }))
