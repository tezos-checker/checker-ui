/*  eslint class-methods-use-this: "off"  */
/*  eslint-env es6  */

import { IFormInputValidator } from 'vdr-react-form-manager'

class CheckerAddressValidator implements IFormInputValidator {
  validate(value: any): string | null {
    if (!value || !value.startsWith('KT1')) {
      return 'Input checker'
    }
    //  no error
    return null
  }
}

export const getCheckerAddressValidator = () => new CheckerAddressValidator()
