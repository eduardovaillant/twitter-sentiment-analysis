import { mockCreateUser, AuthenticationSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { mockCreateUserParams } from '@/tests/domain/mocks'
import { CreateUserController } from '@/presentation/controllers'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'
import { CreateUser } from '@/domain/usecases'

type SutTypes = {
  sut: CreateUserController
  validationSpy: ValidationSpy
  createUserStub: CreateUser
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const createUserStub = mockCreateUser()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new CreateUserController(validationSpy, createUserStub, authenticationSpy)
  return {
    sut,
    validationSpy,
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
    const { sut, validationSpy } = makeSut()
    await sut.handle(mockHttpRequest())
    expect(validationSpy.input).toEqual(mockedCreateUserParams)
  })

  test('should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(badRequest(validationSpy.error))
  })

  test('should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(serverError(new Error()))
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

  test('should return 500 if CreateUser throws', async () => {
    const { sut, createUserStub } = makeSut()
    jest.spyOn(createUserStub, 'create').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(serverError(new Error()))
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

  test('should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(serverError(new Error()))
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
