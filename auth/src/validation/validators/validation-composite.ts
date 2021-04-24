import { Validation, ValidationResponse } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  constructor (
    private readonly validations: Validation[]
  ) {}

  validate (input: any): ValidationResponse {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error.code === 400) {
        return error
      }
    }
  }
}
