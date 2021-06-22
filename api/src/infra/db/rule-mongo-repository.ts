import { AddRuleRepository, TwitterAddRuleResponse } from '@/data/protocols'
import { RuleModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db'

export class RuleMongoRepository implements AddRuleRepository {
  async addRule (rule: TwitterAddRuleResponse): Promise<RuleModel> {
    const rulesCollection = await MongoHelper.getCollection('rules')
    const result = await rulesCollection.insertOne(rule)
    return MongoHelper.map(result.ops[0])
  }
}
