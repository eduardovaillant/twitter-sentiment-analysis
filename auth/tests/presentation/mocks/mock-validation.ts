import { Validation, ValidationResponse } from '@/presentation/protocols/validation'

import faker from 'faker'

export const mockValidationReponseSuccess = (): ValidationResponse => (
  {
    code: 200,
    messages: null
  }
)

export const mockValidationReponseFailure = (): ValidationResponse => (
  {
    code: 400,
    messages: [
      faker.datatype.string(30)
    ]
  }
)

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): ValidationResponse {
      return mockValidationReponseSuccess()
    }
  }
  return new ValidationStub()
}
