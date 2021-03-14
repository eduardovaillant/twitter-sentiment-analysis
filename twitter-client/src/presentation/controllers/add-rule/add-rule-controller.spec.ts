import { AddRuleController } from './add-rule-controller'
import { AddRule, AddRuleModel, RuleModel, HttpRequest, Validation, ValidationResponse, badRequest, serverError, created } from './add-rule-controller-protocols'

const makeFakeRuleModel = (): RuleModel => (
  {
    id: 'any_id',
    value: 'any_value',
    tag: 'any_tag',
    twitter_rule_id: 'any_id'
  }
)

const makeAddRuleStub = (): AddRule => {
  class AddRulesStub implements AddRule {
    async add (rule: AddRuleModel): Promise<RuleModel> {
      return await Promise.resolve(makeFakeRuleModel())
    }
  }
  return new AddRulesStub()
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (value: any): ValidationResponse {
      return {
        isValid: true
      }
    }
  }
  return new ValidationStub()
}

const makeFakeRule = (): AddRuleModel => ({
  value: 'any_value'
})

const makeFakeRequest = (body: any): HttpRequest => ({
  body
})

type SutTypes = {
  sut: AddRuleController
  addRuleStub: AddRule
  validationStub: Validation
}
const makeSut = (): SutTypes => {
  const addRuleStub = makeAddRuleStub()
  const validationStub = makeValidationStub()
  const sut = new AddRuleController(addRuleStub, validationStub)
  return {
    sut,
    addRuleStub,
    validationStub
  }
}

describe('AddRuleController', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest(makeFakeRule()))
    expect(validateSpy).toHaveBeenLastCalledWith(makeFakeRule())
  })

  test('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce({ isValid: false, errors: ['any_error'] })
    const response = await sut.handle(makeFakeRequest(makeFakeRule()))
    expect(response).toEqual(badRequest(['any_error']))
  })

  test('should return 500 if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call AddRule with correct values', async () => {
    const { sut, addRuleStub } = makeSut()
    const addSpy = jest.spyOn(addRuleStub, 'add')
    await sut.handle(makeFakeRequest(makeFakeRule()))
    expect(addSpy).toBeCalledWith(makeFakeRule())
  })

  test('should return 500 if AddRule throws', async () => {
    const { sut, addRuleStub } = makeSut()
    jest.spyOn(addRuleStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })

  test('should return 201 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeRequest(makeFakeRule()))
    expect(response).toEqual(created(makeFakeRuleModel()))
  })
})
