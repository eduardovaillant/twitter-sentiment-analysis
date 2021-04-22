import { mockValidation } from '@/tests/presentation/mocks'
import { mockAuthenticationParams } from '@/tests/domain/mocks'
import { LoginController } from '@/presentation/controllers'
import { HttpRequest, Validation } from '@/presentation/protocols'

const authenticationParams = mockAuthenticationParams()

const mockRequest = (): HttpRequest => ({
  body: authenticationParams
})

type SutTypes = {
  sut: LoginController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new LoginController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('LoginController', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(authenticationParams.email)
  })
})
