import { TwitterAddRuleResponse } from '@/data/protocols/adapters/twitter-add-rule'
import { RuleModel } from '@/domain/models/rule-model'

export interface AddRuleRepository {
  addRule: (rule: TwitterAddRuleResponse) => Promise<RuleModel>
}
