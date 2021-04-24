import { LengthValidator, Range } from '@/validation/protocols'

export class LengthValidatorSpy implements LengthValidator {
  range: Range
  input: string
  isValidLength = true

  isLength (range: Range, input: string): boolean {
    this.input = input
    this.range = range
    return this.isValidLength
  }
}
