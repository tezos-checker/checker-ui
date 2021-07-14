import { mockedCheckers } from '@config'
import { IFormInputAvailableValue } from 'vdr-react-form-manager'

export const getCheckerAvailableValues = (): IFormInputAvailableValue[] =>
  mockedCheckers.map((x) => ({
    value: x.address,
    label: x.address,
  }))
