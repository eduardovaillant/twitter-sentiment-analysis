import { LengthValidator, Range } from '@/validation/protocols'

import validator from 'validator'

export class LengthValidatorAdapter implements LengthValidator {
  isLength (input: string, range: Range): boolean {
    return validator.isLength(input, range)
  }
}
