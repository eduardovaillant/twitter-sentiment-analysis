import { CreateUserController } from '@/presentation/controllers/create-user-controller'
import { Validation, HttpRequest } from '@/presentation/protocols'
import { mockValidation } from '@/tests/presentation/mocks'
import { mockCreateUserParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: CreateUserController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new CreateUserController(validationStub)
  return {
    sut,
    validationStub
  }
}

const mockedCreateUserParams = mockCreateUserParams()

const mockHttpRequest = (): HttpRequest => ({
  body: mockedCreateUserParams
})

describe('CreateUserController', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockHttpRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockedCreateUserParams)
  })
})
