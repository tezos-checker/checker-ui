/*  eslint class-methods-use-this: "off"  */
/*  eslint-env es6  */

import BigNumber from 'bignumber.js'
import { IFormInputValidator } from 'vdr-react-form-manager'

class MinNumberValidator implements IFormInputValidator {
  private minNumber: BigNumber

  constructor(minNumber: BigNumber) {
    this.minNumber = minNumber
  }

  validate(value: any): string | null {
    const num = new BigNumber(value)
    if (num.isNaN() || num.isLessThan(this.minNumber)) {
      return `Invalid number or number is less than ${this.minNumber}`
    }
    //  no error
    return null
  }
}

export const getMinNumberValidator = (minNumber: BigNumber) => new MinNumberValidator(minNumber)
