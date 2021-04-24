import { EmailValidator } from '@/validation/protocols'
import { Validation, ValidationResponse } from '@/presentation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): ValidationResponse {
    this.emailValidator.isValid(input)
    return null
  }
}
