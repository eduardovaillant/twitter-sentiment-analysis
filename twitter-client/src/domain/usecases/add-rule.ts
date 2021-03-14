import { RuleModel } from '@/domain/models/rule-model'

export type AddRuleModel = Omit<RuleModel, 'id'| 'twitter_rule_id'>

export interface AddRule {
  add: (rule: AddRuleModel) => Promise<RuleModel>
}
