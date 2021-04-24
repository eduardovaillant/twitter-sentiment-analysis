import { mockValidation, mockValidationFailure } from '@/tests/presentation/mocks'
import { ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [
    mockValidation(),
    mockValidation()
  ]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('ValidationComposite', () => {
  test('should return 400 if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(mockValidationFailure())
    const result = sut.validate({ [field]: faker.random.word() })
    expect(result.code).toBe(400)
  })
})
