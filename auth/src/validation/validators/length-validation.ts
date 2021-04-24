import { LengthValidator, Range } from '@/validation/protocols'
import { Validation } from '@/presentation/protocols'

export class LengthValidation implements Validation {
  constructor (
    private readonly range: Range,
    private readonly lengthValidator: LengthValidator
  ) {}

  validate (input: any): Error {
    this.lengthValidator.isLength(this.range, input)
    return null
  }
}
