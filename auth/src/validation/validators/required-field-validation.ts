import { Validation, ValidationResponse } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): ValidationResponse {
    if (!input[this.fieldName]) {
      return {
        code: 400,
        errors: [`Missing param: '${this.fieldName}'`]
      }
    }
    return {
      code: 200,
      errors: null
    }
  }
}
