import { CreateUserController } from '@/presentation/controllers/create-user-controller'
import { Validation, HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'
import { mockCreateUser, mockValidation, mockValidationFailure, mockAuthentication } from '@/tests/presentation/mocks'
import { mockCreateUserParams } from '@/tests/domain/mocks'
import { Authentication, CreateUser } from '@/domain/usecases'

type SutTypes = {
  sut: CreateUserController
  validationStub: Validation
  createUserStub: CreateUser
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const createUserStub = mockCreateUser()
  const authenticationStub = mockAuthentication()
  const sut = new CreateUserController(validationStub, createUserStub, authenticationStub)
  return {
    sut,
    validationStub,
    createUserStub,
    authenticationStub
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
    const createSpy = jest.spyOn(createUserStub, 'create')
    await sut.handle(mockHttpRequest())
    expect(createSpy).toHaveBeenCalledWith(mockedCreateUserParams)
  })

  test('should return 403 if CreateUser returns false', async () => {
    const { sut, createUserStub } = makeSut()
    jest.spyOn(createUserStub, 'create').mockReturnValueOnce(Promise.resolve(false))
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(forbidden(new EmailInUseError()))
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockHttpRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: mockedCreateUserParams.email,
      password: mockedCreateUserParams.password
    })
  })
})
