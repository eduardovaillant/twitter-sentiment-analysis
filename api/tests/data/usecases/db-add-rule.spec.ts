import { DbAddRule } from '@/data/usecases'
import { TwitterAddRule, AddRuleRepository } from '@/data/protocols'
import { mockAddRuleRepository, mockTwitterAddRule } from '@/tests/data/mocks/mock-add-rule'
import { mockAddRuleParams, mockAddRuleResponse, mockRuleModel } from '@/tests/domain/mocks'
import { LoadRuleByValueRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddRule
  loadRuleByValueRepositorySpy: LoadRuleByValueRepositorySpy
  twitterAddRuleStub: TwitterAddRule
  addRuleRepositoryStub: AddRuleRepository
}

const makeSut = (): SutTypes => {
  const loadRuleByValueRepositorySpy = new LoadRuleByValueRepositorySpy()
  const twitterAddRuleStub = mockTwitterAddRule()
  const addRuleRepositoryStub = mockAddRuleRepository()
  const sut = new DbAddRule(loadRuleByValueRepositorySpy, twitterAddRuleStub, addRuleRepositoryStub)
  return {
    sut,
    loadRuleByValueRepositorySpy,
    twitterAddRuleStub,
    addRuleRepositoryStub
  }
}

describe('DbAddRule', () => {
  test('should call the LoadRuleByValueRepository with correct value', async () => {
    const { sut, loadRuleByValueRepositorySpy } = makeSut()
    await sut.add(mockAddRuleParams())
    expect(loadRuleByValueRepositorySpy.value).toBe(mockAddRuleParams().value)
  })

  test('should throw if LoadRuleByValueRepository throws', async () => {
    const { sut, loadRuleByValueRepositorySpy } = makeSut()
    jest.spyOn(loadRuleByValueRepositorySpy, 'loadByValue').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(mockAddRuleParams())
    await expect(promise).rejects.toThrow()
  })

  test('should call the TwitterAddRule with correct values', async () => {
    const { sut, twitterAddRuleStub } = makeSut()
    const addRuleSpy = jest.spyOn(twitterAddRuleStub, 'addRule')
    await sut.add(mockAddRuleParams())
    expect(addRuleSpy).toHaveBeenCalledWith(mockAddRuleParams())
  })

  test('should throw if TwitterAddRule throws', async () => {
    const { sut, twitterAddRuleStub } = makeSut()
    jest.spyOn(twitterAddRuleStub, 'addRule').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(mockAddRuleParams())
    await expect(promise).rejects.toThrow()
  })

  test('should call the AddRuleRepository with correct values', async () => {
    const { sut, addRuleRepositoryStub } = makeSut()
    const addRuleSpy = jest.spyOn(addRuleRepositoryStub, 'addRule')
    await sut.add(mockAddRuleParams())
    expect(addRuleSpy).toHaveBeenCalledWith(mockAddRuleResponse())
  })

  test('should throw if AddRuleRepository throws', async () => {
    const { sut, addRuleRepositoryStub } = makeSut()
    jest.spyOn(addRuleRepositoryStub, 'addRule').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(mockAddRuleParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return a rule on success', async () => {
    const { sut } = makeSut()
    const rule = await sut.add(mockAddRuleParams())
    expect(rule).toEqual(mockRuleModel())
  })
})
