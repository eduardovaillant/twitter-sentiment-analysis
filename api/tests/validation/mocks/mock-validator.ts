import { EmailValidator, LengthValidator, Range } from '@/validation/protocols'

export class LengthValidatorSpy implements LengthValidator {
  range: Range
  input: string
  isValidLength = true

  isLength (input: string, range: Range): boolean {
    this.input = input
    this.range = range
    return this.isValidLength
  }
}

export class EmailValidatorSpy implements EmailValidator {
  isValidEmail = true
  email: string

  isValid (email: string): boolean {
    this.email = email
    return this.isValidEmail
  }
}
