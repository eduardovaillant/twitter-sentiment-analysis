import { LengthValidator, Range } from '@/validation/protocols'
import { Validation } from '@/presentation/protocols'
import { InvalidLengthError } from '@/presentation/errors/invalid-length-error'

export class LengthValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly range: Range,
    private readonly lengthValidator: LengthValidator
  ) {}

  validate (input: any): Error {
    const isLength = this.lengthValidator.isLength(input, this.range)
    if (!isLength) {
      return new InvalidLengthError(this.fieldName, this.range.min, this.range.max)
    }
  }
}
