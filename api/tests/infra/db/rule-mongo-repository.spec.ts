import { TwitterAddRuleResponse } from '@/data/protocols'
import { Collection } from 'mongodb'
import { MongoHelper, RuleMongoRepository } from '@/infra/db'

let rulesCollection: Collection

const mockTwitterAddRuleResponse = (): TwitterAddRuleResponse => (
  {
    value: 'any_value',
    tag: 'any_tag',
    twitter_rule_id: 'any_id'
  }
)

describe('TweetRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    rulesCollection = await MongoHelper.getCollection('rules')
    await rulesCollection.deleteMany({})
  })

  const makeSut = (): RuleMongoRepository => {
    return new RuleMongoRepository()
  }

  describe('addRule()', () => {
    test('should return a rule on addRule success', async () => {
      const sut = makeSut()
      const rule = await sut.addRule(mockTwitterAddRuleResponse())
      expect(rule).toBeTruthy()
      expect(rule.id).toBeTruthy()
      expect(rule.tag).toBe('any_tag')
      expect(rule.value).toBe('any_value')
      expect(rule.twitter_rule_id).toBe('any_id')
    })
  })

  describe('loadByValue()', () => {
    test('should return a rule on loadByValue success', async () => {
      const sut = makeSut()
      await rulesCollection.insertOne(mockTwitterAddRuleResponse())
      const rule = await sut.loadByValue('any_value')
      expect(rule).toBeTruthy()
      expect(rule.id).toBeTruthy()
      expect(rule.tag).toBe('any_tag')
      expect(rule.value).toBe('any_value')
      expect(rule.twitter_rule_id).toBe('any_id')
    })
  })
})
