import { CreateUserController } from '@/presentation/controllers/create-user-controller'
import { Validation, HttpRequest } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import { mockCreateUser, mockValidation, mockValidationFailure } from '@/tests/presentation/mocks'
import { mockCreateUserParams } from '@/tests/domain/mocks'
import { CreateUser } from '@/domain/usecases/user'

type SutTypes = {
  sut: CreateUserController
  validationStub: Validation
  createUserStub: CreateUser
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const createUserStub = mockCreateUser()
  const sut = new CreateUserController(validationStub, createUserStub)
  return {
    sut,
    validationStub,
    createUserStub
  }
}

const mockedCreateUserParams = mockCreateUserParams()

const mockHttpRequest = (): HttpRequest => ({
  body: mockedCreateUserParams
})

describe('CreateUserController', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockHttpRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockedCreateUserParams)
  })

  test('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const mockedValidationFailureResponse = mockValidationFailure()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(mockedValidationFailureResponse)
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(badRequest(mockedValidationFailureResponse.errors))
  })

  test('should call CreateUser with correct values', async () => {
    const { sut, createUserStub } = makeSut()
    const validateSpy = jest.spyOn(createUserStub, 'create')
    await sut.handle(mockHttpRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockedCreateUserParams)
  })
})
