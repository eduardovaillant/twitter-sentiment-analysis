import { EmailValidatorSpy } from '@/tests/validation/mocks'
import { EmailValidation } from '@/validation/validators'

import faker from 'faker'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('EmailValidation', () => {
  test('should call EmailValidator with correct value', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  test('should return 400 if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isValidEmail = false
    const result = sut.validate(faker.internet.email())
    expect(result.code).toBe(400)
    expect(result.errors[0]).toBe('Invalid email!')
  })

  test('should return 200 if EmailValidator returns true', () => {
    const { sut } = makeSut()
    const result = sut.validate(faker.internet.email())
    expect(result.code).toBe(200)
  })
})
