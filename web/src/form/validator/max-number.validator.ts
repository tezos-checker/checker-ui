/*  eslint class-methods-use-this: "off"  */
/*  eslint-env es6  */

import BigNumber from 'bignumber.js'
import { IFormInputValidator } from 'vdr-react-form-manager'

class MaxNumberValidator implements IFormInputValidator {
  private maxNumber: BigNumber

  constructor(maxNumber: BigNumber) {
    this.maxNumber = maxNumber
  }

  validate(value: any): string | null {
    const num = new BigNumber(value)
    if (num.isNaN() || num.isGreaterThan(this.maxNumber)) {
      return `Invalid number or number is greater than ${this.maxNumber}`
    }
    //  no error
    return null
  }
}

export const getMaxNumberValidator = (maxNumber: BigNumber) => new MaxNumberValidator(maxNumber)
