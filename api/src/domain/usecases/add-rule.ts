import { RuleModel } from '@/domain/models/rule-model'

export type AddRuleParams = Omit<RuleModel, 'id'| 'twitter_rule_id'>

export interface AddRule {
  add: (rule: AddRuleParams) => Promise<RuleModel>
}
