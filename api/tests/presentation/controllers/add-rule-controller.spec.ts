import { AddRuleController } from '@/presentation/controllers'
import { HttpRequest } from '@/presentation/protocols'
import { mockAddRuleParams, mockRuleModel } from '@/tests/domain/mocks'
import { badRequest, created, serverError } from '@/presentation/helpers'
import { AddRuleSpy, ValidationSpy } from '@/tests/presentation/mocks'

const mockRequest = (body: any): HttpRequest => ({
  body
})

type SutTypes = {
  sut: AddRuleController
  addRuleSpy: AddRuleSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addRuleSpy = new AddRuleSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddRuleController(addRuleSpy, validationSpy)
  return {
    sut,
    addRuleSpy,
    validationSpy
  }
}

describe('AddRuleController', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    await sut.handle(mockRequest(mockAddRuleParams()))
    expect(validateSpy).toHaveBeenLastCalledWith(mockAddRuleParams())
  })

  test('should return 400 if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const response = await sut.handle(mockRequest(mockAddRuleParams()))
    expect(response).toEqual(badRequest(new Error()))
  })

  test('should return 500 if validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call AddRule with correct values', async () => {
    const { sut, addRuleSpy } = makeSut()
    await sut.handle(mockRequest(mockAddRuleParams()))
    expect(addRuleSpy.rule).toEqual(mockAddRuleParams())
  })

  test('should return 500 if AddRule throws', async () => {
    const { sut, addRuleSpy } = makeSut()
    jest.spyOn(addRuleSpy, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })

  test('should return 201 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest(mockAddRuleParams()))
    expect(response).toEqual(created(mockRuleModel()))
  })
})
