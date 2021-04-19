import { Validation, ValidationResponse } from '@/presentation/protocols/validation'

import faker from 'faker'

export const mockValidationSuccess = (): ValidationResponse => (
  {
    code: 200,
    errors: null
  }
)

export const mockValidationFailure = (): ValidationResponse => (
  {
    code: 400,
    errors: [
      faker.datatype.string(30)
    ]
  }
)

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): ValidationResponse {
      return mockValidationSuccess()
    }
  }
  return new ValidationStub()
}
