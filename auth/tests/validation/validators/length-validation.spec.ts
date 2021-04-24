import { LengthValidatorSpy } from '@/tests/validation/mocks'
import { LengthValidation } from '@/validation/validators'
import { InvalidLengthError } from '@/presentation/errors'

import faker from 'faker'

const fieldName = faker.random.word()
const input = faker.random.word()
const range = { min: 1, max: 2 }

type SutTypes = {
  sut: LengthValidation
  lengthValidatorSpy: LengthValidatorSpy
}

const makeSut = (): SutTypes => {
  const lengthValidatorSpy = new LengthValidatorSpy()
  const sut = new LengthValidation(fieldName, range, lengthValidatorSpy)
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

  test('should return an InvalidLengthError if LengthValidator returns false', () => {
    const { sut, lengthValidatorSpy } = makeSut()
    lengthValidatorSpy.isValidLength = false
    const error = sut.validate(input)
    expect(error).toEqual(new InvalidLengthError(fieldName, range.min, range.max))
  })

  test('should throw if LengthValidator throws', () => {
    const { sut, lengthValidatorSpy } = makeSut()
    jest.spyOn(lengthValidatorSpy, 'isLength').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})
