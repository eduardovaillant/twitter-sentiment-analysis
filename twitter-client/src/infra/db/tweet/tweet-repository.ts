import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { AddRuleRepository, RuleModel, TwitterAddRuleResponse } from '@/data/usecases/rules/add-rule/add-rule-impl-protocols'

export class TweetRepository implements AddRuleRepository {
  async addRule (rule: TwitterAddRuleResponse): Promise<RuleModel> {
    const rulesCollection = await MongoHelper.getCollection('rules')
    const result = await rulesCollection.insertOne(rule)
    return MongoHelper.map(result.ops[0])
  }
}
