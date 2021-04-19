import { CreateUserController } from '@/presentation/controllers/create-user-controller'
import { Validation, HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, ok } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'
import { mockCreateUser, mockValidation, mockValidationFailure, AuthenticationSpy } from '@/tests/presentation/mocks'
import { mockCreateUserParams } from '@/tests/domain/mocks'
import { CreateUser } from '@/domain/usecases'

type SutTypes = {
  sut: CreateUserController
  validationStub: Validation
  createUserStub: CreateUser
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const createUserStub = mockCreateUser()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new CreateUserController(validationStub, createUserStub, authenticationSpy)
  return {
    sut,
    validationStub,
    createUserStub,
    authenticationSpy
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
    const { sut, authenticationSpy } = makeSut()
    const authSpy = jest.spyOn(authenticationSpy, 'auth')
    await sut.handle(mockHttpRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: mockedCreateUserParams.email,
      password: mockedCreateUserParams.password
    })
  })

  test('should return 200 on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(ok({
      name: authenticationSpy.result.name,
      accessToken: authenticationSpy.result.accessToken
    }))
  })
})
