import { LengthValidatorSpy } from '@/tests/validation/mocks'
import { LengthValidation } from '@/validation/validators'

import faker from 'faker'

const input = faker.random.word()
const range = { min: 1, max: 2 }

type SutTypes = {
  sut: LengthValidation
  lengthValidatorSpy: LengthValidatorSpy
}

const makeSut = (): SutTypes => {
  const lengthValidatorSpy = new LengthValidatorSpy()
  const sut = new LengthValidation(range, lengthValidatorSpy)
  return {
    sut,
    lengthValidatorSpy
  }
}

describe('LengthValidation', () => {
  test('should call LengthValidator with correct values', () => {
    const { sut, lengthValidatorSpy } = makeSut()
    sut.validate(input)
    expect(lengthValidatorSpy.input).toBe(input)
    expect(lengthValidatorSpy.range).toBe(range)
  })
})
