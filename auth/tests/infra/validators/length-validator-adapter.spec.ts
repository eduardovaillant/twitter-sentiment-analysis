import { LengthValidatorAdapter } from '@/infra/validators'

import validator from 'validator'
import faker from 'faker'

const range = { min: 1, max: 2 }

jest.mock('validator', () => ({
  isLength (): boolean {
    return true
  }
}))

const makeSut = (): LengthValidatorAdapter => {
  return new LengthValidatorAdapter()
}

describe('LengthValidatorAdapter', () => {
  test('should call validator with correct values', () => {
    const sut = makeSut()
    const isLengthSpy = jest.spyOn(validator, 'isLength')
    const input = faker.random.word()
    sut.isLength(input, range)
    expect(isLengthSpy).toHaveBeenCalledWith(input, range)
  })
})
