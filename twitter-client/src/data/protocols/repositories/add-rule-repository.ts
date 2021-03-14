import { TwitterAddRuleResponse } from '@/data/protocols/clients/twitter-add-rule'
import { RuleModel } from '@/domain/models/rule-model'

export interface AddRuleRepository {
  addRule: (rule: TwitterAddRuleResponse) => Promise<RuleModel>
}
