import { CreateUserController } from '@/presentation/controllers/create-user-controller'
import { Validation, HttpRequest } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import { mockValidation, mockValidationFailure } from '@/tests/presentation/mocks'
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

  test('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const mockedValidationFailureResponse = mockValidationFailure()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(mockedValidationFailureResponse)
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(badRequest(mockedValidationFailureResponse.errors))
  })
})
