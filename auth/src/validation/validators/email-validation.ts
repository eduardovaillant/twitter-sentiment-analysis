import { EmailValidator } from '@/validation/protocols'
import { Validation, ValidationResponse } from '@/presentation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): ValidationResponse {
    const isValid = this.emailValidator.isValid(input.email)
    if (!isValid) {
      return {
        code: 400,
        errors: ['Invalid email!']
      }
    }
    return {
      code: 200,
      errors: null
    }
  }
}
