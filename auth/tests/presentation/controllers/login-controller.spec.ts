import { AuthenticationSpy, mockValidation, mockValidationFailure } from '@/tests/presentation/mocks'
import { mockAuthenticationParams } from '@/tests/domain/mocks'
import { LoginController } from '@/presentation/controllers'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { badRequest, serverError } from '@/presentation/helpers'

const authenticationParams = mockAuthenticationParams()

const mockRequest = (): HttpRequest => ({
  body: authenticationParams
})

type SutTypes = {
  sut: LoginController
  validationStub: Validation
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginController(validationStub, authenticationSpy)
  return {
    sut,
    validationStub,
    authenticationSpy
  }
}

describe('LoginController', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(authenticationParams.email)
  })

  test('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const validationFailure = mockValidationFailure()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(validationFailure)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(validationFailure.errors))
  })

  test('should return 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(authenticationSpy.authenticationParams).toEqual(authenticationParams)
  })
})
