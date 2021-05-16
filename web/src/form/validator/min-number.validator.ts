/*  eslint class-methods-use-this: "off"  */
/*  eslint-env es6  */

import { IFormInputValidator } from 'vdr-react-form-manager'

class MinNumberValidator implements IFormInputValidator {
  private minNumber: number

  constructor(minNumber: number) {
    this.minNumber = minNumber
  }

  validate(value: any): string | null {
    if (Number.isNaN(value) || value < this.minNumber) {
      return `Invalid number or number is less than ${this.minNumber}`
    }
    //  no error
    return null
  }
}

export const getMinNumberValidator = (minNumber: number) => new MinNumberValidator(minNumber)
