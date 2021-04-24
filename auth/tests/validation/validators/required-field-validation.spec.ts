import { RequiredFieldValidation } from '@/validation/validators'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation(field)
  return {
    sut
  }
}

describe('RequiredFielValidation', () => {
  test('should return 400 if validation fails', () => {
    const { sut } = makeSut()
    const result = sut.validate({ invalidField: faker.random.word() })
    expect(result.code).toBe(400)
    expect(result.errors[0]).toBe(`Missing param: '${field}'`)
  })

  test('should return 200 on success', () => {
    const { sut } = makeSut()
    const result = sut.validate({ [field]: faker.random.word() })
    expect(result.code).toBe(200)
  })
})
