import { TwitterAddRuleResponse } from '@/data/protocols'
import { Collection } from 'mongodb'
import { MongoHelper, RuleMongoRepository } from '@/infra/db'

let accountCollection: Collection

const makeFakeTwitterAddRuleResponse = (): TwitterAddRuleResponse => (
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
    accountCollection = await MongoHelper.getCollection('rules')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): RuleMongoRepository => {
    return new RuleMongoRepository()
  }

  describe('addRule()', () => {
    test('should return a rule on addRule success', async () => {
      const sut = makeSut()
      const rule = await sut.addRule(makeFakeTwitterAddRuleResponse())
      expect(rule).toBeTruthy()
      expect(rule.id).toBeTruthy()
      expect(rule.tag).toBe('any_tag')
      expect(rule.value).toBe('any_value')
      expect(rule.twitter_rule_id).toBe('any_id')
    })
  })
})
